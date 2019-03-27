const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Document, DocumentTag } = require('../../models');
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

router.post('/', (req, res) => {
    
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

    Document.create({
        CourseId: req.query.CourseId,
        name: req.query.name,
        description: req.query.description,
        type: req.query.type,
        year: req.query.year
    })
    .then(record => {
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

        upload(req, res, function(err) {
            if (err) {
                record.destroy();
                res.status(400).json();
            } else {
                record.update({ key: req.file.key })
                .then(result => {
                    console.log('RECORD: ', record);
                    console.log('TAGS: ', req.query.tags);
                    if(req.query.TagIds){
                        let tagIds = req.query.TagIds;
                        tagIds.forEach(tagId => {
                            DocumentTag.create({
                                DocumentId: record.id,
                                TagId: tagId
                            }); 
                        });
                    }
                    res.status(201).json(record);
                });
            }
        });
    })
    .catch(e => {
        res.status(400).json(e);
    });
});

module.exports = router;