const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Document, DocumentTag, Tag, Rating } = require('../../models');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const uuidv1 = require('uuid/v1');
const path = require('path');
const config = require('../../local');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

router.get('/filter', async (req, res, next) => {

    let data = _.pick(req.body, [
        'name',
        'types',
        'yearFrom',
        'yearTo',
        'tags',
        'ratingFrom',
        'ratingTo'
    ]);

    if(_.isEmpty(data.tags)){
        
        if(!data.name) data.name = '';
    
        if(!data.types) data.types = ['note', 'book', 'test', 'exam'];

        if(!data.yearFrom) data.yearFrom = await Document.min('year') || 1980;

        if(!data.yearTo) data.yearTo = new Date().getFullYear();

        if(!data.ratingFrom) data.ratingFrom = 1;

        if(!data.ratingTo) data.ratingTo = 5;
        
        try{
            let docs = await Document.findAll({
                where: {
                    name: {
                        [Op.iLike]: '%' + data.name + '%'
                    },
                    year: {
                        [Op.between]: [data.yearFrom, data.yearTo]
                    },
                    type: data.types,
                    rating: {
                        [Op.or]: {
                            [Op.between]: [data.ratingFrom, data.ratingTo],
                            [Op.eq]: null
                        }
                    }
                }
            });
            res.status(200).json(docs);
        }
        catch(e){
            res.status(500).json({message: 'Error'});
        }
    }
    else{
        next();
    }   
});

router.get('/filter', async (req, res) => {

    let data = _.pick(req.body, [
        'name',
        'types',
        'yearFrom',
        'yearTo',
        'tags',
        'ratingFrom',
        'ratingTo'
    ]);

    if(!data.name) data.name = '';

    if(!data.types) data.types = ['note', 'book', 'test', 'exam'];

    if(!data.yearFrom) data.yearFrom = await Document.min('year') || 1980;

    if(!data.yearTo) data.yearTo = new Date().getFullYear();

    if(!data.ratingFrom) data.ratingFrom = 1;

    if(!data.ratingTo) data.ratingTo = 5;
    
    try{
        let docs = await Document.findAll({
            where: {
                name: {
                    [Op.iLike]: '%' + data.name + '%'
                },
                year: {
                    [Op.between]: [data.yearFrom, data.yearTo]
                },
                type: data.types,
                tags: {
                    [Op.or]: {
                        [Op.overlap]: data.tags
                    }
                },
                rating: {
                    [Op.or]: {
                        [Op.between]: [data.ratingFrom, data.ratingTo],
                        [Op.eq]: null
                    }
                }
            }
        });
        res.status(200).json(docs);
    }
    catch(e){
        res.status(500).json({message: 'Error'});
    }
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

router.put('/:id', async (req, res) => {
    let data = _.pick(req.body, [
        'CourseId',
        'name', 
        'description',
        'type',
        'year',
        'tags'
    ]);

    try{
        if(data.tags){
            for(let tag of data.tags){
                let tagFound = await Tag.findOne({
                    where: {
                        name: tag
                    }
                });
                if(!tagFound){
                    await Tag.create({
                        name: tag
                    });
                }
            }    
        }
        let document = await Document.findByPk(req.params.id);
        if(document){
            await document.update(data);
            res.status(200).json(document);
        }
        else{
            res.status(404).json({message: 'Not Found'});
        }
    }
    catch(e){
        res.status(500).json({message: 'Failed to edit document'});
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

    try{
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
                await document.update({ key: req.file.key });
                let tags = req.query.tags;
                tags = tags.map(a => a.toLowerCase());
                let queryTags = [ ...new Set(tags) ];
                await document.update({
                    tags: queryTags
                });
                for(let tag of queryTags){
                    let tagFound = await Tag.findOne({
                        where: {
                            name: tag
                        }
                    });
                    if(!tagFound){
                        await Tag.create({
                            name: tag
                        });
                    }
                }
                res.status(201).json(document);
            }
        });
    }
    catch(e){
        res.status(500).json({message: 'Failed to upload document'});
    }
});

router.delete('/:id', (req, res) => {
    Document.findByPk(req.params.id)
    .then(record => {
        if (record) {
            record.destroy().then(result => {
                let options = {
                    Bucket: config.S3.BUCKET_NAME,
                    Key: record.key
                };
                s3.deleteObject(options, (err, data) => {
                    if (err) {
                        res.status(500).json();
                    }
                    else {
                        res.status(204).json();
                    }
                });
            });
        } else {
            res.status(404).json({message: 'Not Found'});
        }
    })
    .catch(e => res.status(500).json());
});

module.exports = router;