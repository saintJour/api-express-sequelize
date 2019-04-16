const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Tag } = require('../../models');

router.post('/', (req, res) => {
    let data = _.pick(req.body, [
        'name'
    ]);

    if(_.isEmpty(data)){
        res.status(400).json({message: 'Tag data not provided'});
    }

    if(!data.name){
        res.status(400).json({message: 'Tag name not provided'});
    }

    Tag.create(data)
    .then(record => {
        res.status(201).json(record);
    })
    .catch(e => res.status(500).json());
});

router.get('/', (req, res) => {
    Tag.findAll()
    .then(records => {
        res.status(200).json(records);
    })
    .catch(e => res.status(500).json());
});

module.exports = router;