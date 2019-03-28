const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Document, DocumentTag, Tag } = require('../../models');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const uuidv1 = require('uuid/v1');
const path = require('path');
const config = require('../../local');

aws.config.update({
  accessKeyId: config.S3.ACCESS_KEY_ID,
  secretAccessKey: config.S3.SECRET_ACCESS_KEY
});

const s3 = new aws.S3();

router.get('/', (req, res) => {
    Document.findAll()
    .then(records => {
        res.status(200).json(records);
    })
    .catch(e => res.status(500).json());
});

router.get('/:id', (req, res) => {
    Document.findByPk(req.params.id)
    .then(record => {
        if (record) {
          res.status(200).json(record);
        } else {
          res.status(404).json({message: 'Not Found'});
        }
    })
    .catch(e => res.status(500).json());
});

router.get('/:id/tags', async (req, res) => {
    let tags = [];
    let document = await Document.findByPk(req.params.id);
    if(document){
        let doctags = await document.getDocumentTags();
        for(let doctag of doctags) {
            let tag = await doctag.getTag();
            tags.push(tag.name);
        }
        res.status(200).json(tags);
    }
    else{
        res.status(404).json({message: 'Not Found'});
    }
});

router.post('/', async (req, res) => {
    
    if(_.isEmpty(req.query.CourseId)){
        return res.status(400).json({message: 'Document CourseId not provided'});
    }

    if(_.isEmpty(req.query.name)){
        return res.status(400).json({message: 'Document name not provided'});
    }

    if(_.isEmpty(req.query.description)){
        return res.status(400).json({message: 'Document description not provided'});
    }

    if(_.isEmpty(req.query.type)){
        return res.status(400).json({message: 'Document type not provided'});
    }

    if(_.isEmpty(req.query.year)){
        return res.status(400).json({message: 'Document year not provided'});
    }

    let document = await Document.create({
        CourseId: req.query.CourseId,
        name: req.query.name,
        description: req.query.description,
        type: req.query.type,
        year: req.query.year
    });

    let upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: config.S3.BUCKET_NAME,
            metadata: function(req, file, cb) {
                cb(null, { document: file.fieldname });
            },
            key: function(req, file, cb) {
                cb(null, 'documents/' + uuidv1() + path.extname(file.originalname));
            }
        }),
        fileFilter: function(req, file, callback) {
            let ext = path.extname(file.originalname);
            if (ext !== '.pdf' && ext !== '.doc' && ext !== '.docx') {
              return callback(new Error('Only documents are allowed'));
            }
            callback(null, true);
        },
        limits: { fileSize: 10 * 1024 * 1024 }
    }).single('document');

    upload(req, res, async function(err) {
        if (err) {
            await document.destroy();
            res.status(400).json();
        } else {
            await document.update({ key: req.file.key })
            let tags = req.query.tags;
            tags = [ ...new Set(tags) ];
            console.log(tags);
            for(let tag of tags){
                let tagFound = await Tag.findOne({
                    where: {
                        name: tag
                    }
                });
                if(tagFound){
                    await DocumentTag.create({
                        DocumentId: document.id,
                        TagId: tagFound.id
                    });
                }
                else{
                    let newTag = await Tag.create({
                        name: tag
                    });
                    await DocumentTag.create({
                        DocumentId: document.id,
                        TagId: newTag.id
                    });
                }
            }
            res.status(201).json(document);
        }
    });


    
});

module.exports = router;