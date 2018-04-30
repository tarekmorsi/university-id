const express = require('express');
const router = express.Router();

// Controllers

const studentController = require('../controllers/studentController');
const sessionController = require('../controllers/sessionController');

// Routes for student user

router.post('/authenticate', sessionController.updateSessions, studentController.authenticate);

router.get('/profile', sessionController.updateSessions, studentController.getProfile);  // get the student's info

router.post('/pass', sessionController.updateSessions, studentController.getPass);  // get the student's pass

router.post('/session', sessionController.updateSessions, sessionController.updateSession); // update session status

module.exports = router;
