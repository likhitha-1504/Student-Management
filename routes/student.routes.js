const express = require('express');
const router = express.Router();
const controller = require('../controllers/student.controller');
const validateStudent = require('../middlewares/validateStudent.middleware');

router.post('/', validateStudent, controller.createStudent);
router.get('/', controller.getAllStudents);
router.get('/:id', controller.getStudentById);
router.put('/:id', validateStudent, controller.updateStudent);
router.delete('/:id', controller.deleteStudent);

module.exports = router;