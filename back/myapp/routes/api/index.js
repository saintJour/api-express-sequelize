const router = require('express').Router();
const institutions = require('./institutions');
const programs = require('./programs');
const semesters = require('./semesters');
const courses = require('./courses');
const documents = require('./documents');

router.use('/v1/institutions', institutions);
router.use('/v1/institutions/:InstitutionId/programs', programs);
router.use('/v1/institutions/:InstitutionId/programs/:ProgramId/semesters', semesters);
router.use('/v1/institutions/:InstitutionId/programs/:ProgramId/semesters/:SemesterId/courses', courses);
router.use('/v1/documents', documents);

module.exports = router;