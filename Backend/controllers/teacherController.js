var Teacher = require('../models/teacher');
var Session = require('../models/session')
var jwt = require('../auth/jwt');


var teacherController = {

	/**
	 * Admin Authenticate
	 * @param {String} req.body.email
	 * @param {String} req.body.password
	 */

	async authenticate(req, res) {
		try {
			req.checkBody('phoneNumber', 'Phone number is required').notEmpty()

			let errors = await req.validationErrors()
			if (errors) {
				let response = {
					error: {
						code: 400,
						errors: errors
					}
				}
				res.status(response.error.code).json(response)
			}
			let credentials = {
				phoneNumber: req.body.phoneNumber,
				type: 'teacher'
			}
			let response = await jwt.generate(credentials)

			if (response.data) {
				return res.status(200).json(response)
			} else {
				return res.status(response.error.code).json(response)
			}

		} catch (err) {
			let response = {
				error: {
					code: 500,
					message: err.message
				}
			}
			res.status(response.error.code).json(response)
		}
	},


  async getProfile(req, res) {
    try {

      const token = req.headers['jwt-token']
      let decoded = await jwt.verifyTeacher(token)

      if (decoded) {
        let teacher = await Teacher.getTeacherByNumber(decoded.phoneNumber)

        if (!teacher) {
          return res.status(404).json({
            success: false,
            msg: "Teacher not found"
          })
        } else {
          return res.status(200).json(teacher)
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


	async getSessions(req, res) {
		try {

			const token = req.headers['jwt-token']
			let decoded = await jwt.verifyTeacher(token)

			if (decoded) {
				let teacher = await Teacher.getTeacherByNumber(decoded.phoneNumber)

				if (!teacher) {
					return res.status(404).json({
						success: false,
						msg: "Teacher not found"
					})
				} else {
					let sessions = await Session.findSessionsAssignedToTeacher(teacher._id)

					if(sessions){
						return res.status(200).json(sessions)
					}else{
						let response = {
							error: {
								code: 404,
								message: 'No sessions found'
							}
						}
						res.status(response.error.code).json(response)
					}
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

	async getStudentsForSession(req, res) {
		try {
			const token = req.headers['jwt-token']
			let decoded = await jwt.verifyTeacher(token)

			if (decoded) {
				req.checkBody('id', 'Session id is required').notEmpty()

				let errors = await req.validationErrors()
				if (errors) {
					let response = {
						error: {
							code: 400,
							errors: errors
						}
					}
					res.status(response.error.code).json(response)
				// }else{
				}else{

					let teacher = await Teacher.getTeacherByNumber(decoded.phoneNumber)

					if (!teacher) {
						return res.status(404).json({
							success: false,
							msg: "Teacher not found"
						})
					} else {
						let students = await Session.findStudentsForSession(req.body.id)

						if(students){
							return res.status(200).json(students)
						}else{
							let response = {
								error: {
									code: 404,
									message: 'No sessions found'
								}
							}
							res.status(response.error.code).json(response)
						}
					}
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

	async editAttendance(req, res) {
		try {
			const token = req.headers['jwt-token']
			let decoded = await jwt.verifyTeacher(token)

			if (decoded) {
				req.checkBody('session_id', 'Session id is required').notEmpty()
				req.checkBody('student_id', 'Student id is required').notEmpty()


				let errors = await req.validationErrors()
				if (errors) {
					let response = {
						error: {
							code: 400,
							errors: errors
						}
					}
					res.status(response.error.code).json(response)
				// }else{
				}else{

					let teacher = await Teacher.getTeacherByNumber(decoded.phoneNumber)

					if (!teacher) {
						return res.status(404).json({
							success: false,
							msg: "Teacher not found"
						})
					} else {
						let student = await Session.editSessionForStudent(req.body.session_id, req.body.student_id)

						if(student){
							return res.status(200).json(student)
						}else{
							let response = {
								error: {
									code: 404,
									message: 'No sessions found'
								}
							}
							res.status(response.error.code).json(response)
						}
					}
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

}

module.exports = teacherController;
