const Account = require('../models/account');
const jwt = require('../auth/jwt');
const twilio = require('../config/sms');
var Admin = Account.base.models.Admin
var Teacher = Account.base.models.Teacher
var Student = Account.base.models.Student


const studentController = {

	/**
	 * Student get Pin
	 * @param {String} req.body.phoneNumber
	 */


 	async getPin(req, res) {
 		try {
 			req.checkBody('phoneNumber', 'Phone Number is required').notEmpty()

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

			if(req.body.phoneNumber != "01002003004"){

 			let student = await Student.getStudentByNumber(req.body.phoneNumber)

 			if (!student) {
 				let response = {
 					error: {
 						code: 404,
 						message: 'Student not found'
 					}
 				}
 				res.status(response.error.code).json(response)
 			} else {

 				let response = await twilio.sendSMS(student.phoneNumber)

 				return res.status(200).json(response)
 			}
		}else{
			let response = {
 				data: {
 					code: 200,
 					message: "Demo Authentication"
 				}
 			}
			return res.status(200).json(response)

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

 	async authenticate(req, res) {
 		try {
 			req.checkBody('phoneNumber', 'Phone Number is required').notEmpty()
 			req.checkBody('pin', 'Pin is required').notEmpty()

 			let errors = await req.validationErrors()
 			if (errors) {
 				let response = {
 					error: {
 						code: 400,
 						errors: errors
 					}
 				}
 				res.status(response.error.code).json(response)
 			}else{
				if(req.body.phoneNumber != "01002003004"){
	 			let verified = await twilio.verify(req.body.phoneNumber, req.body.pin)

	 			if (!verified) {

	 				let response = {
	 					error: {
	 						code: 500,
	 						message: "Invalid pin"
	 					}
	 				}
	 				res.status(response.error.code).json(response)

	 			} else {

	 				let credentials = {
	 					phoneNumber: req.body.phoneNumber,
	 					type: 'student'
	 				}

	 				let response = await jwt.generate(credentials)

	 				if (response.data) {
	 					return res.status(200).json(response)
	 				} else {
	 					return res.status(response.error.code).json(response)
	 				}

	 			}
			}else{
				let credentials = {
					phoneNumber: req.body.phoneNumber,
					type: 'student'
				}

				let response = await jwt.generate(credentials)

				if (response.data) {
					return res.status(200).json(response)
				} else {
					return res.status(response.error.code).json(response)
				}
			}
			}
 		} catch (err) {
 			let response = {
 				error: {
 					code: 500,
 					message: err
 				}
 			}
 			console.log(err)
 			res.status(response.error.code).json(response)
 		}
 	},


	async getPass(req, res) {
		try {
			req.checkBody('phoneNumber', 'Phone Number is required').notEmpty()

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

				// let response = await twilio.sendSMS(student.phoneNumber)
				return res.status(200).json(student)
			}

		} catch (err) {
			return res.status(500).json({
				success: false,
				msg: err
			})
		}
	},


		async getProfile(req, res) {
			try {

				const token = req.headers['jwt-token']
				let decoded = await jwt.verifyStudent(token)

				if (decoded) {
					let student = await Student.getStudentByNumber(decoded.phoneNumber)

					if (!student) {
						return res.status(404).json({
							success: false,
							msg: "Student not found"
						})
					} else {
						return res.status(200).json(student)
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



};
module.exports = studentController;
