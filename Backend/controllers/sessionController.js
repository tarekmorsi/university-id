var Student = require('../models/student');
var moment = require('moment');

const sessionController = {

async updateSessions(req, res, next) {
    try {
      let students = await Student.find()
      for(i = 0; i<students.length; i++){
          let sessions = students[i].sessions
          for (j = 0; j< sessions.length; j++){
            if(sessions[j].status == "pending"){
              let start_date = sessions[j].start_date
              let chunk = sessions[j].chunk
              let chunk_type = sessions[j].chunk_type
              var epoch = moment(start_date).add(chunk, chunk_type).unix();
              let now = moment(Date.now()).add(2, 'hours').unix();
              if(now>epoch){
                sessions[j].status = "not_attended"
                await Student.updateStudent(students[i]._id, students[i])
              }
            }
          }
  		}
      next()
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        msg: err
      })
    }
  },


async updateSession(req, res) {
  			try {
  				const token = req.headers['jwt-token']
  				let decoded = await jwt.verifyStudent(token)
  				if (decoded) {
  					try {
  						req.checkBody('id', 'Session ID is required').notEmpty()
  						req.checkBody('status', 'Status is required').notEmpty()

  						let errors = await req.validationErrors()
  						if (errors) {
  								return res.status(400).json({
  									success: false,
  									msg: errors
  								})
  						}

  						let student = await Student.getStudentByNumber(decoded.phoneNumber)

  						if (!student) {
  							return res.status(404).json({
  								success: false,
  								msg: "Student not found"
  							})
  						} else {

  							let edit = await Student.findSessionAndUpdate(student.sessions, req.body.id, req.body.status)

  							if(edit){
  								let updatedStudent = await Student.updateStudent(decoded._id, student)
  								return res.status(200).json(updatedStudent)
  							}else{
  								return res.status(404).json({
  									success: false,
  									msg: "Session not found."
  								})
  							}


  						}

  				} catch (err) {
  							return res.status(500).json({
  								success: false,
  								msg: err
  							})
  					}

  			}else {

  							let response = {
  								error: {
  									code: 401,
  									message: 'Unauthorized access'
  								}
  							}
  							res.status(response.error.code).json(response)
  			}

  			} catch (err) {
  					return res.status(500).json({
  						success: false,
  						msg: err
  			})
  		}
  },

  async updateSessionUsingAccessPoint(req, res) {
    			try {
    					try {
                req.checkBody('phoneNumber', 'Student Number is required').notEmpty()
    						req.checkBody('id', 'Session ID is required').notEmpty()
    						req.checkBody('status', 'Status is required').notEmpty()

    						let errors = await req.validationErrors()
    						if (errors) {
    								return res.status(400).json({
    									success: false,
    									msg: errors
    								})
    						}

    						let student = await Student.getStudentByNumber(req.body.phoneNumber)

    						if (!student) {
    							return res.status(404).json({
    								success: false,
    								msg: "Student not found"
    							})
    						} else {

    							let edit = await Student.findSessionAndUpdateAccessPoint(student.sessions, req.body.id, req.body.status)

    							if(edit){
    								let updatedStudent = await Student.updateStudent(student._id, student)
    								return res.status(200).json(updatedStudent)
    							}else{
    								return res.status(404).json({
    									success: false,
    									msg: "Session not found."
    								})
    							}


    						}

    				} catch (err) {
              console.log(err)
    							return res.status(500).json({
    								success: false,
    								msg: err
    							})
    					}



    			} catch (err) {
    					return res.status(500).json({
    						success: false,
    						msg: err
    			})
    		}
    },





}

module.exports = sessionController;
