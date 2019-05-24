const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Program, Semester } = require('../../models');

router.get('/:id', (req, res) => {
    Program.findByPk(req.params.id)
    .then(record => {
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json({message: 'Not Found'});
      }
    })
    .catch(e => res.status(500).json());
});

router.get('/:id/semesters', (req, res) => {
    Semester.findAll({
        where: {
            ProgramId: req.params.id
        }
    })
    .then(records => {
        res.status(200).json(records);
    })
    .catch(e => res.status(500).json());
});


module.exports = router;