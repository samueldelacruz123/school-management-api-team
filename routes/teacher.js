const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// #swagger.tags = ['Teachers']
// #swagger.summary = 'Get all teachers'
// #swagger.description = 'Returns a list of all teachers'
router.get('/', teacherController.getAllTeacher);

// #swagger.tags = ['Teachers']
// #swagger.summary = 'Get a teacher by ID'
// #swagger.description = 'Returns a single teacher based on the provided ID'
// #swagger.parameters['id'] = { description: 'Teacher ID' }
router.get('/:id', teacherController.getSingleTeacher);

// #swagger.tags = ['Teachers']
// #swagger.summary = 'Create a new teacher'
// #swagger.description = 'Creates a new teacher record'
// #swagger.parameters['teacher'] = {
//     in: 'body',
//     description: 'Teacher data',
//     required: true,
//     schema: {
//         firstName: 'Jane',
//         lastName: 'Smith',
//         email: 'jane.smith@example.com',
//         department: 'Mathematics',
//         hireYear: 2018,
//         isTenured: true,
//         courses: ['math101', 'math201']
//     }
// }
router.post('/', isAuthenticated, validation.saveTeacher, teacherController.createTeacher);

// #swagger.tags = ['Teachers']
// #swagger.summary = 'Update a teacher by ID'
// #swagger.description = 'Updates an existing teacher record based on ID'
// #swagger.parameters['id'] = { description: 'Teacher ID' }
// #swagger.parameters['teacher'] = {
//     in: 'body',
//     description: 'Teacher data to update',
//     required: true,
//     schema: {
//         firstName: 'Jane',
//         lastName: 'Smith',
//         email: 'jane.smith@example.com',
//         department: 'Mathematics',
//         hireYear: 2018,
//         isTenured: true,
//         courses: ['math101', 'math201']
//     }
// }
router.put('/:id', isAuthenticated, validation.saveTeacher, teacherController.updateTeacher);

// #swagger.tags = ['Teachers']
// #swagger.summary = 'Delete a teacher'
// #swagger.description = 'Deletes a teacher record based on ID'
// #swagger.parameters['id'] = { description: 'Teacher ID' }
router.delete('/:id', isAuthenticated, teacherController.deleteTeacher);

module.exports = router;