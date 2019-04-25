const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Institution, Program, Course, Document } = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/', async (req, res) => {
    let data = _.pick(req.body, [
        'term',
        'type'
    ]);

    if(_.isEmpty(data)){
        return res.status(400). json({message: 'Search data not provided'});
    }

    if(!data.term){
        return res.status(400).json({message: 'Search term not provided'});
    }

    if(!data.type){
        return res.status(400).json({message: 'Search type not provided'});
    }

    if(data.term.length < 3){
        return res.status(400).json({message: 'Term must have at least 3 characters'});
    }

    let records;

    try{
        switch (data.type){
            case 1:
                records = await Institution.findAll({
                    where: {
                        name: {
                            [Op.iLike]: '%' + data.term + '%'
                        }
                    }
                });
                break;
            case 2:
                records = await Program.findAll({
                    where: {
                        name: {
                            [Op.iLike]: '%' + data.term + '%'
                        }
                    }
                });
                break;
            case 3:
                records = await Course.findAll({
                    where: {
                        name: {
                            [Op.iLike]: '%' + data.term + '%'
                        }
                    }
                });
                break;
            case 4:
                records = await Document.findAll({
                    where: {
                        name: {
                            [Op.iLike]: '%' + data.term + '%'
                        }
                    },
                    limit: 8
                });
                break;
            default:
                return res.status(400).json({message: 'Search type not found'});
        }
        res.status(200).json(records);
    }
    catch(e){
        res.status(500).json({message: 'Error'});
    }
});

module.exports = router;
