var Admin = require('../models/admin');
var Student = require('../models/student');
var Session = require('../models/session');
var Teacher = require('../models/teacher');
var jwt = require('../auth/jwt');


//Default Admin

Admin.findOne({
  email: 'admin@gmail.com'
}, (err, admin) => {
  if (!admin) {
    let defaultAdmin = new Admin({
      email: 'admin@gmail.com',
      password: 'admin',
      isSuper: true
    })
    Admin.updatePassword(defaultAdmin)
  } else {
    if (err)
      throw err
  }
})



var adminController = {

	/**
	 * Admin Authenticate
	 * @param {String} req.body.email
	 * @param {String} req.body.password
	 */

	async authenticate(req, res) {
		try {
			req.checkBody('email', 'Email is required').notEmpty()
			req.checkBody('email', 'Email is not correct').isEmail()
			req.checkBody('password', 'Password is required').notEmpty()

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
				email: req.body.email,
				password: req.body.password,
				type: 'admin'
			}
			let response = await jwt.generate(credentials)

			if (response.data) {
				return res.status(200).json(response)
			} else {
				return res.status(response.error.code).json(response)
			}

		} catch (err) {
      console.log(err)
			let response = {
				error: {
					code: 500,
					message: err.message
				}
			}
			res.status(response.error.code).json(response)
		}
	},

	/**
	 * Get all students
	 * @param {String} req
	 * @param {String} res
	 */

	async getAllStudents(req, res) {
		try {
			const token = req.headers['jwt-token']
			let decoded = await jwt.verify(token)
			if (decoded) {
				let students = await Student.find()
				let response = {
					data: {
						students
					}
				}
				res.status(200).json(response)
			} else {
				let response = {
					error: {
						code: 401,
						message: 'Unauthorized access'
					}
				}
				res.status(response.error.code).json(response)
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

  /**
   * Get all teachers
   * @param {String} req
   * @param {String} res
   */

  async getAllTeachers(req, res) {
		try {
			const token = req.headers['jwt-token']
			let decoded = await jwt.verify(token)
			if (decoded) {
				let teachers = await Teacher.find()
				let response = {
					data: {
						teachers
					}
				}
				res.status(200).json(response)
			} else {
				let response = {
					error: {
						code: 401,
						message: 'Unauthorized access'
					}
				}
				res.status(response.error.code).json(response)
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


    /**
  	 * Get all sessions
  	 * @param {String} req
  	 * @param {String} res
  	 */

  	async getAllSessions(req, res) {
  		try {
  			const token = req.headers['jwt-token']
  			let decoded = await jwt.verify(token)
  			if (decoded) {
  				let sessions = await Session.find()
  				let response = {
  					data: {
  						sessions
  					}
  				}
  				res.status(200).json(response)
  			} else {
  				let response = {
  					error: {
  						code: 401,
  						message: 'Unauthorized access'
  					}
  				}
  				res.status(response.error.code).json(response)
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

	/**
	 * Add a new student
	 * @param {String} req.body.firstName
	 * @param {String} req.body.lastName
	 * @param {String} req.body.phoneNumber
	 * @param {String} req.body.id
	 * @param {String} req.body.birthDate
	 * @param {String} req.body.group
	 * @param {String} req.body.email
	 * @param {String} req.body.photo
	 */

	async addStudent(req, res) {
		try {
			const token = req.headers['jwt-token'];
			let decoded = await jwt.verify(token)
			if (decoded) {
				req.checkBody('firstName', 'First Name is required').notEmpty();
				req.checkBody('lastName', 'Last Name is required').notEmpty();
				req.checkBody('email', 'Email is required').notEmpty();
				req.checkBody('phoneNumber', 'Phone Number is required').notEmpty();
				req.checkBody('id', 'ID is required').notEmpty();
				req.checkBody('birthDate', 'Birth Date is required').notEmpty();
				req.checkBody('group', 'Group is required').notEmpty();
				req.checkBody('email', 'Email is not correct').isEmail();

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
				let newStudent = await Student.addStudent(req.body.firstName + " " + req.body.lastName, req.body.email,
								req.body.phoneNumber, req.body.id, req.body.birthDate, req.body.group)

				let response = {
					data: {
						newStudent
					}
				}
				res.status(200).json(response)

			} else {
				let response = {
					error: {
						code: 401,
						message: 'Unauthorized access'
					}
				}
				res.status(response.error.code).json(response)
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


  /**
   * Add a new teacher
   * @param {String} req.body.firstName
   * @param {String} req.body.lastName
   * @param {String} req.body.phoneNumber
   * @param {String} req.body.birthDate
   * @param {String} req.body.email
   * @param {String} req.body.photo
   */

  async addTeacher(req, res) {
    try {
      const token = req.headers['jwt-token'];
      let decoded = await jwt.verify(token)
      if (decoded) {
        req.checkBody('firstName', 'First Name is required').notEmpty();
        req.checkBody('lastName', 'Last Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('phoneNumber', 'Phone Number is required').notEmpty();
        req.checkBody('birthDate', 'Birth Date is required').notEmpty();
        req.checkBody('email', 'Email is not correct').isEmail();

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
        let newTeacher = await Teacher.addTeacher(req.body.firstName + " " + req.body.lastName, req.body.email,
                req.body.phoneNumber, req.body.birthDate)

        let response = {
          data: {
            newTeacher
          }
        }
        res.status(200).json(response)

      } else {
        let response = {
          error: {
            code: 401,
            message: 'Unauthorized access'
          }
        }
        res.status(response.error.code).json(response)
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

  /**
   * Add new sessions for students
   * @param {String} req.body.title
   * @param {String} req.body.day
   * @param {String} req.body.hour
   * @param {String} req.body.minutes
   * @param {String} req.body.location
   * @param {String} req.body.chunk
   * @param {String} req.body.chunk_type
   * @param {Date} req.body.semester_start
   * @param {Date} req.body.semester_end
   * @param {String} req.body.reader_serial
   * @param {String} req.body.students
   */

	async addSessionsToStudents(req, res){
		try {
			const token = req.headers['jwt-token'];
 			let decoded = await jwt.verify(token)
 			if (decoded) {
				req.checkBody('title', 'Title is required').notEmpty();
				req.checkBody('day', 'The session\'s day of the week is required').notEmpty();
				req.checkBody('hour', 'The session\'s hour in a day is required').notEmpty();
				req.checkBody('minutes', 'The session\'s additional minutes is required').notEmpty();
				req.checkBody('location', 'Location is required').notEmpty();
				req.checkBody('chunk', 'Chunk is required').notEmpty();
				req.checkBody('chunk_type', 'Chunk type is required').notEmpty();
				req.checkBody('semester_start', 'Semester start date').notEmpty();
				req.checkBody('semester_end', 'Semester end date').notEmpty();
				req.checkBody('reader_serial', 'Reader serial number is required').notEmpty();
				req.checkBody('students', 'An array of the students assigned to the sessions is required').notEmpty();
        req.checkBody('teacher', 'Teacher is required').notEmpty();

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
				let newSessions = await Session.generateSessions(req.body.title, req.body.day, req.body.hour, req.body.minutes,
								req.body.location, req.body.chunk, req.body.chunk_type, req.body.semester_start, req.body.semester_end,
								req.body.reader_serial, req.body.students, req.body.teacher)

				let response = {
					data: {
						newSessions
					}
				}
				res.status(200).json(response)


			} else {
				let response = {
					error: {
						code: 401,
						message: 'Unauthorized access'
					}
				}
				res.status(response.error.code).json(response)
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


  	/**
  	 *Delete an existing student
  	 * @param {String} req.params.id
  	 */

  	async deleteStudent(req, res) {
  		try {
  			const token = req.headers['jwt-token'];
   			let decoded = await jwt.verify(token)
   			if (decoded) {
  				await Student.deleteStudent(req.params.id)
  				res.status(204).json()
  			} else {
  				let response = {
  					error: {
  						code: 401,
  						message: 'Unauthorized access'
  					}
  				}
  				res.status(response.error.code).json(response)
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


    /**
  	 *Delete an existing student
  	 * @param {String} req.params.id
  	 */

  	async deleteTeacher(req, res) {
  		try {
  			const token = req.headers['jwt-token'];
   			let decoded = await jwt.verify(token)
   			if (decoded) {
  				await Teacher.deleteTeacher(req.params.id)
  				res.status(204).json()
  			} else {
  				let response = {
  					error: {
  						code: 401,
  						message: 'Unauthorized access'
  					}
  				}
  				res.status(response.error.code).json(response)
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



};
module.exports = adminController;
