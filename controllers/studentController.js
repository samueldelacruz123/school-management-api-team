const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
//samueldelacruz123

// Get all students
const getAllStudent = async (req, res) => {
    try {
        // #swagger.tags = ['Students']
        const result = await mongodb.getDatabase().db().collection('students').find();
        const students = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving students', error: err.message });
    }
};

// Get single student by id
const getSingleStudent = async (req, res) => {
    try {
        // #swagger.tags = ['Students']
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid student ID' });
        }

        const studentId = new ObjectId(id);
        const result = await mongodb.getDatabase().db().collection('students').find({ _id: studentId });
        const students = await result.toArray();

        if (students.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving student', error: err.message });
    }
};

// Create a new student
const createStudent = async (req, res) => {
    try {
        // #swagger.tags = ['Students']
        const student = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            major: req.body.major,
            gpa: req.body.gpa,
            enrollmentYear: req.body.enrollmentYear,
            isFullTime: req.body.isFullTime,
            courses: req.body.courses,
        };

        const response = await mongodb.getDatabase().db().collection('students').insertOne(student);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Student created successfully' });
        } else {
            res.status(500).json({ message: 'Failed to create student' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error creating student', error: err.message });
    }
};

// Update a student by id
const updateStudent = async (req, res) => {
    try {
        // #swagger.tags = ['Students']
        const studentId = new ObjectId(req.params.id);
        const student = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            major: req.body.major,
            gpa: req.body.gpa,
            enrollmentYear: req.body.enrollmentYear,
            isFullTime: req.body.isFullTime,
            courses: req.body.courses,
        };

        const response = await mongodb.getDatabase().db().collection('students').replaceOne({ _id: studentId }, student);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Student updated successfully' });
        } else {
            res.status(404).json({ message: 'Student not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating student', error: err.message });
    }
};

// Delete a student by id
const deleteStudent = async (req, res) => {
    try {
        // #swagger.tags = ['Students']
        const studentId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('students').deleteOne({ _id: studentId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Student deleted successfully' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting student', error: err.message });
    }
};

module.exports = {
    getAllStudent,
    getSingleStudent,
    createStudent,
    updateStudent,
    deleteStudent,
};