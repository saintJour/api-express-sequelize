const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Semester } = require('../../models');

/* router.post('/', (req, res) => {
    let data = _.pick(req.body, [
        'name'
    ]);

    if(_.isEmpty(data)){
        return res.status(400). json({message: 'Semester data not provided'});
    }

    if(!data.name){
        return res.status(400).json({message: 'Semester name not provided'});
    }

    data.ProgramId = req.params.ProgramId;

    Semester.create(data)
    .then(record => {
        res.status(201).json(record);
    })
    .catch(e => res.status(500).json());
}); */

router.get('/', (req, res) => {
    Semester.findAll({
        where: {
            ProgramId: req.params.ProgramId
        }
    })
    .then(records => {
        res.status(200).json(records);
    })
    .catch(e => res.status(500).json());
});

router.get('/:id', (req, res) => {
    Semester.findByPk(req.params.id)
    .then(record => {
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json({message: 'Not Found'});
      }
    })
    .catch(e => res.status(500).json());
});

/* router.delete('/:id', (req, res) => {
    Semester.findByPk(req.params.id)
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
}); */

module.exports = router;