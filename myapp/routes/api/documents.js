const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Document} = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
            console.log(e)
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



module.exports = router;