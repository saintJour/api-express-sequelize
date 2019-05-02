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
const login = require('./login');
const profile = require('./profile');
const middlewares = require('./middlewares');
const course_info = require('./course_info');

//no user account needed

router.use('/v1/register', register);
router.use('/v1/login', login);
router.use('/v1/documents', documents);
router.use('/v1/search', search);
router.use('/v1/tags', tags);
router.use('/v1/institutions', institutions);
router.use('/v1/institutions/:InstitutionId/programs', programs);
router.use('/v1/institutions/:InstitutionId/programs/:ProgramId/semesters', semesters);
router.use('/v1/institutions/:InstitutionId/programs/:ProgramId/semesters/:SemesterId/courses', courses);
router.use('/v1/course_info', course_info);

//user account needed

router.use(middlewares.validateToken);
router.use('/v1/profile', profile);
router.use('/v1/ratings', ratings);

//admin account needed



module.exports = router;