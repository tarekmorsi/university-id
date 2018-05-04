var imageUpload = require('../config/imageUpload');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-promise');
var generatePassword = require('password-generator'); // a dependency that generates random password
var Student = require('../models/student');
var Admin = require('../models/admin');



// define the schema for the Teacher model


var teacherSchema = new Schema({
	name: String,
	phoneNumber: {
		type: String,
		unique: true,
	},
	birthDate: String,
	email: String,
  password: String,
	photo: String,
});


// create the model for users and expose it to our app
var Teacher = module.exports = mongoose.model('Teacher', teacherSchema);

module.exports.getTeacherByNumber = async (phoneNumber) => {
	try {
		const query = {
			phoneNumber: phoneNumber
		}
		let teacher = await Teacher.findOne(query)
		return teacher
	} catch (err) {
		throw err
	}
}

module.exports.getTeacherById = async (id) => {
	try {
		let teacher = await Teacher.findById(id)
		return teacher
	} catch (err) {
		throw err
	}
}

module.exports.getTeacherByEmail = async (email) => {
	try {
		const query = {
			email: email
		}
		let teacher = await Teacher.findOne(query)
		return teacher
	} catch (err) {
		throw err
	}
}

module.exports.addTeacher = async (name, email, phoneNumber, birthDate, photo) => {
	try {
		let teacher = await Teacher.getTeacherByNumber(phoneNumber)
		let student = await Student.getStudentByNumber(phoneNumber)
		let teacher2 = await Teacher.getTeacherByEmail(email)
		let student2 = await Student.getStudentByEmail(email)
		let admin = await Admin.getAdminByEmail(email)

		if (teacher || student || teacher2 || student2 || admin) {
			let response = {
				error: {
					code: 401,
					message: 'Duplicate Phone Number or Email'
				}
			}
			return response

		} else {
			if (photo) {
				let imageurl = await imageUpload.uploadToWeb(photo)

				let teacher = new Teacher({
					name: name,
					phoneNumber: phoneNumber,
					birthDate: birthDate,
					email: email,
					photo: imageurl,
					// serial: "AAAAAAAAABYAAAAAAAAAAAEAAAAAAA==",
					// serial_signature: "KhgcLZNUijU5RFIhBRzOZApz2qQZ0hg+srE5ZQZh09yHxydLq3WwI6udC5pq8mt/Z9l4YUpTi6/jfP7NFRJ85a/bFOC5bHVVm2ZrPtNTHevMEt2WL1it3p3AJKoQqE5YOFvVI4i5LDz/aoDr/VvKI29AuoIaOolt+OHrFM3Pp+A="
				})

				let newTeacher = await teacher.save()
				return newTeacher
			} else {

				let teacher = new Teacher({
					name: name,
					phoneNumber: phoneNumber,
					birthDate: birthDate,
					email: email,
					photo: "http://www.freelanceme.net/Images/default%20profile%20picture.png",
					// serial: "AAAAAAAAABYAAAAAAAAAAAEAAAAAAA==",
					// serial_signature: "KhgcLZNUijU5RFIhBRzOZApz2qQZ0hg+srE5ZQZh09yHxydLq3WwI6udC5pq8mt/Z9l4YUpTi6/jfP7NFRJ85a/bFOC5bHVVm2ZrPtNTHevMEt2WL1it3p3AJKoQqE5YOFvVI4i5LDz/aoDr/VvKI29AuoIaOolt+OHrFM3Pp+A="

				})

				let newTeacher = await teacher.save()
				return newTeacher
			}
		}
	} catch (err) {
		throw err
	}
}

module.exports.deleteTeacher = async (id) => {
	try {
		let deletedTeacher = Teacher.findByIdAndRemove(id)
		return deletedTeacher
	} catch (err) {
		throw err
	}
}

module.exports.updatePassword = async (teacher) => {
	try {
		let salt = await bcrypt.genSalt(10)
		let hash = await bcrypt.hash(teacher.password, salt, null)
		teacher.password = hash
		let newTeacher = await teacher.save()
		return newTeacher
	} catch (err) {
		throw err
	}
}

module.exports.comparePassword = async (candidatePassword, hash) => {
	try {
		let isMatch = bcrypt.compare(candidatePassword, hash)
		return isMatch
	} catch (err) {
		throw err
	}
}
