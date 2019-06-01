const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { User, Document } = require('../../models');
const aws = require('aws-sdk');
const config = require('../../local');

aws.config.update({
    accessKeyId: config.S3.ACCESS_KEY_ID,
    secretAccessKey: config.S3.SECRET_ACCESS_KEY
});
  
const s3 = new aws.S3();

router.get('/documents', async (req, res) => {
    let currentUser = await User.findByPk(req.UserId);
    if(currentUser.role === 'admin'){
        let docs = await Document.findAll({
            where: {
                approved: false
            }
        });
        return res.status(200).json(docs);
    }
    else{
        return res.status(401).json({message: 'Unauthorized'});
    }
});

router.put('/documents/:id', async (req, res) => {
    let currentUser = await User.findByPk(req.UserId);
    if(currentUser.role === 'admin'){
        let doc = await Document.findByPk(req.params.id);
        if(doc){
            await doc.update({
                approved: true
            });
            return res.status(200).json(doc);
        }
        else{
            return res.status(404).json({message: 'Not Found'});
        }        
    }
    else{
        return res.status(401).json({message: 'Unauthorized'});
    }
});

router.delete('/documents/:id', async (req, res) => {
    let currentUser = await User.findByPk(req.UserId);
    if(currentUser.role === 'admin'){
        let doc = await Document.findByPk(req.params.id);
        if(doc){
            await doc.destroy();
            let options = {
                Bucket: config.S3.BUCKET_NAME,
                Key: doc.key
            };
            await s3.deleteObject(options, (err, data) => {
                if (err) {
                    return res.status(500).json();
                }
                else {
                    return res.status(204).json();
                }
            });
        }
        else{
            return res.status(404).json({message: 'Not Found'});
        }        
    }
    else{
        return res.status(401).json({message: 'Unauthorized'});
    }
});

module.exports = router;