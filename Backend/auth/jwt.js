const jwt = require('jsonwebtoken')
const Account = require('../models/account')
var Admin = Account.base.models.Admin
var Teacher = Account.base.models.Teacher
var Student = Account.base.models.Student
const secret = 'ilovescotchscotchyscotchscotch'
const secretStudent = 'demodemopassappdemodemodemopass'
const secretAccount = 'Account'
const secretTeacher = 'teacherteacherteacherteacher'




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
			} else if (credentials.type === 'teacher'){
				let teacher = await Teacher.getTeacherByNumber(credentials.phoneNumber)
				if (!teacher) {
					let response = {
						error: {
							code: 404,
							message: 'Teacher not found'
						}
					}
					return response
				} else {
					const token = await jwt.sign(teacher.toJSON(), secretTeacher)
					let response = {
						data: {
							token: token,
							teacher: teacher
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

	async verifyTeacher(token) {
		try {
			let decoded = await jwt.verify(token, secretTeacher)
			return decoded
		} catch (err) {
			throw err
		}
	},
};
