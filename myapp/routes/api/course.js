const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Course, Document } = require('../../models');

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

router.get('/:id/documents', (req, res) => {
    Course.findByPk(req.params.id)
    .then(record => {
      if (record) {
        Document.findAll({
            where: {
                CourseId: req.params.id,
                approved: true
            }
        })
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(e => res.status(500).json());
      } else {
        res.status(404).json({message: 'Not Found'});
      }
    })
    .catch(e => res.status(500).json());
});

module.exports = router;