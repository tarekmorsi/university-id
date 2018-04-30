var express = require('express');
var router = express.Router();

// Controllers

var adminController = require('../controllers/adminController');
var sessionController = require('../controllers/sessionController');
var imageUpload = require('../config/imageUpload')

// Routes for admin user

router.post('/authenticate', sessionController.updateSessions, adminController.authenticate); // Admin  login

router.post('/student', imageUpload.upload.any(), sessionController.updateSessions, adminController.addStudent); // Admin can add a student

router.delete('/student/:id', sessionController.updateSessions, adminController.deleteStudent); // Admin can delete a student

// router.post('/updateStudent', imageUpload.upload.any(), adminController.updateStudent); // Admin can update a student

router.get('/students', sessionController.updateSessions, adminController.getAllStudents); // Admin can get all students

router.post('/sessions', sessionController.updateSessions, adminController.addSessionsToStudents); // Admin can add sessions to a group of students

router.get('/sessions', sessionController.updateSessions, adminController.getAllSessions); // Admin can get all sessions created


module.exports = router;
