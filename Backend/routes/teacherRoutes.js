const express = require('express');
const router = express.Router();

// Controllers

const teacherController = require('../controllers/teacherController');
const sessionController = require('../controllers/sessionController');


// Routes for teacher user

router.post('/getPin', sessionController.updateSessions, teacherController.getPin);

router.post('/authenticate', sessionController.updateSessions, teacherController.authenticate); // teacher authentication

router.get('/profile', sessionController.updateSessions, teacherController.getProfile);  // get the teacher's info

router.post('/students_for_session', sessionController.updateSessions, teacherController.getStudentsForSession);

router.get('/sessions', sessionController.updateSessions, teacherController.getSessions);

router.post('/edit_attendance', sessionController.updateSessions, teacherController.editAttendance)

module.exports = router;
