const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Rating } = require('../../models');

router.post('/', (req, res) => {
    let data = _.pick(req.body, [
        'DocumentId',
        'value'
    ]);

    if(_.isEmpty(data)){
        res.status(400). json({message: 'Rating data not provided'});
    }

    if(!data.DocumentId){
        res.status(400).json({message: 'Rating DocumentId not provided'});
    }

    if(!data.name){
        res.status(400).json({message: 'Rating name not provided'});
    }

    Rating.create(data)
    .then(record => {
        res.status(201).json(record);
    })
    .catch(e => res.status(500).json());
});

module.exports = router;