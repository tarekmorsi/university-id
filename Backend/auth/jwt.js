const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const Student = require('../models/student')
const secret = 'ilovescotchscotchyscotchscotch'
const secretStudent = 'demodemopassappdemodemodemopass'
const secretAccount = 'Account'



module.exports = {
	async generate(credentials) {
		try {
			if (credentials.type === 'admin') {
				let admin = await Admin.getAdminByEmail(credentials.email)
				if (!admin) {
					let response = {
						error: {
							code: 404,
							message: 'Admin not found'
						}
					}
					return response
				}

				let isMatch = await Admin.comparePassword(credentials.password, admin.password)
				if (isMatch) {
					const token = await jwt.sign(admin.toJSON(), secret)
					let response = {
						data: {
							token: token,
							admin: {
								id: admin._id,
								email: admin.email,
								isSuper: admin.isSuper
							}
						}
					}
					return response
				} else {
					let response = {
						error: {
							code: 400,
							message: 'Wrong password'
						}
					}
					return response
				}
			}  else if (credentials.type === 'student') {
				let student = await Student.getStudentByNumberForAuth(credentials.phoneNumber)
				if (!student) {
					let response = {
						error: {
							code: 404,
							message: 'Student not found'
						}
					}
					return response
				} else {
					const token = await jwt.sign(student.toJSON(), secretStudent)
					let response = {
						data: {
							token: token,
							student: student
						}
					}
					return response
				}
			}
		} catch (err) {
			console.log(err)
			let response = {
				error: {
					code: 500,
					message: err
				}
			}
			return response
		}
	},

	async verify(token) {
		try {
			let decoded = await jwt.verify(token, secret)
			return decoded
		} catch (err) {
			throw err
		}
	},

	async verifyStudent(token) {
		try {
			let decoded = await jwt.verify(token, secretStudent)
			return decoded
		} catch (err) {
			throw err
		}
	},
};
