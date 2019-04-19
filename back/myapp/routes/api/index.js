const router = require('express').Router();
const institutions = require('./institutions');
const programs = require('./programs');
const semesters = require('./semesters');
const courses = require('./courses');
const documents = require('./documents');
const tags = require('./tags');
const ratings = require('./ratings');
const search = require('./search');
const register = require('./register');

router.use('/v1/institutions', institutions);
router.use('/v1/institutions/:InstitutionId/programs', programs);
router.use('/v1/institutions/:InstitutionId/programs/:ProgramId/semesters', semesters);
router.use('/v1/institutions/:InstitutionId/programs/:ProgramId/semesters/:SemesterId/courses', courses);
router.use('/v1/documents', documents);
router.use('/v1/tags', tags);
router.use('/v1/ratings', ratings);
router.use('/v1/search', search);
router.use('/v1/register', register);

module.exports = router;