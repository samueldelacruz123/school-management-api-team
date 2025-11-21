const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const validation = require('../middleware/validate')
const { isAuthenticated } = require('../middleware/authenticate');

// #swagger.tags = ['Students']
// #swagger.summary = 'Get all students'
// #swagger.description = 'Returns a list of all students'
router.get('/', studentController.getAllStudent);

// #swagger.tags = ['Students']
// #swagger.summary = 'Get a student by ID'
// #swagger.description = 'Returns a single student based on the provided ID'
// #swagger.parameters['id'] = { description: 'Student ID' }
router.get('/:id', studentController.getSingleStudent);

// #swagger.tags = ['Students']
// #swagger.summary = 'Create a new student'
// #swagger.description = 'Creates a new student record'
// #swagger.parameters['student'] = {
//     in: 'body',
//     description: 'Student data',
//     required: true,
//     schema: {
//         firstName: 'John',
//         lastName: 'Doe',
//         age: 20,
//         email: 'test@example.com',
//         major: 'Computer Science',
//         gpa: 3.5,
//         enrollmentYear: 2022,
//         isFullTime: true,
//         courses: ['math101', 'cs102']
//     }
// }
router.post('/', isAuthenticated, validation.saveStudent, studentController.createStudent);

// #swagger.tags = ['Students']
// #swagger.summary = 'Update a student by ID'
// #swagger.parameters['id'] = { description: 'Student ID' }
router.put('/:id', isAuthenticated, validation.saveStudent, studentController.updateStudent);

// #swagger.tags = ['Students']
// #swagger.summary = 'Delete a student'
// #swagger.parameters['id'] = { description: 'Student ID' }
router.delete('/:id', isAuthenticated, studentController.deleteStudent);

module.exports = router;