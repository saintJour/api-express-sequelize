const _ = require('lodash');
const router = require('express').Router({ mergeParams: true }); 
const { Institution, Program, Semester, Course} = require('../../models');

router.get('/:id', async (req, res) => {
    let data = {};
    let course = await Course.findByPk(req.params.id);
    if(course){
        let semester = await Semester.findByPk(course.SemesterId);
        let program = await Program.findByPk(semester.ProgramId);
        let institution = await Institution.findByPk(program.InstitutionId);
        data['course'] = course.name;
        data['program'] = program.name;
        data['semester'] = semester.name;
        data['institution'] = institution.name;
        return res.status(200).json(data);
    }
    else return res.status(404).json({message: 'Not Found'});
});

module.exports = router;