const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Institution, Program } = require('../../models');

router.post('/', (req, res) => {
    let data = _.pick(req.body, [
        'name'
    ]);

    if(_.isEmpty(data)){
        res.status(400). json({message: 'Institution data not provided'});
    }

    if(!data.name){
        res.status(400).json({message: 'Institution name not provided'});
    }

    Institution.create(data)
    .then(record => {
        res.status(201).json(record);
    })
    .catch(e => res.status(500).json());
});

router.get('/', (req, res) => {
    Institution.findAll()
    .then(records => {
        res.status(200).json(records);
    })
    .catch(e => res.status(500).json());
});

router.get('/:id', (req, res) => {
    Institution.findByPk(req.params.id)
    .then(record => {
        if (record) {
          res.status(200).json(record);
        } else {
          res.status(404).json({message: 'Not Found'});
        }
    })
    .catch(e => res.status(500).json());
});

router.delete('/:id', (req, res) => {
    Institution.findByPk(req.params.id)
    .then(record => {
        if(record) {
            record.destroy()
            .then(result => {
                res.status(200).json();
            });
        }
        else {
            res.json(404, {message: 'Not Found'});
        }
    })
    .catch(e => res.status(500).json());
});

module.exports = router;