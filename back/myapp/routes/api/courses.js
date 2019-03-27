const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Course } = require('../../models');

router.post('/', (req, res) => {
    let data = _.pick(req.body, [
        'name'
    ]);

    if(_.isEmpty(data)){
        res.status(400). json({message: 'Course data not provided'});
    }

    if(!data.name){
        res.status(400).json({message: 'Course name not provided'});
    }

    data.SemesterId = req.params.SemesterId;

    Course.create(data)
    .then(record => {
        res.status(201).json(record);
    })
    .catch(e => res.status(500).json());
});

router.get('/', (req, res) => {
    Course.findAll({
        where: {
            SemesterId: req.params.SemesterId
        }
    })
    .then(records => {
        res.status(200).json(records);
    })
    .catch(e => res.status(500).json());
});

router.get('/:id', (req, res) => {
    Course.findByPk(req.params.id)
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
    Course.findByPk(req.params.id)
    .then(record => {
        if(record) {
            record.destroy()
            .then(result => {
                res.status(200).json();
            });
        }
        else {
            res.status(404).json({message: 'Not Found'});
        }
    })
    .catch(e => res.status(500).json());
});

module.exports = router;