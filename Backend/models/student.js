var imageUpload = require('../config/imageUpload');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Teacher = require('../models/teacher');
var Admin = require('../models/admin');

// define the schema for the Student model

const sessionSchema =  new Schema({
	title: String,
	start_date: Date,
	location: String,
	chunk: Number,
	chunk_type: String,
	status: String,
	reader_serial:String,
	teacher:String
});

var studentSchema = new Schema({
	name: String,
	phoneNumber: {
		type: String,
		unique: true,
	},
	birthDate: String,
	group: String,
	email: String,
	id: {
		type: String,
		unique: true
	},
	photo: String,
	sessions: [sessionSchema],
	serial: String,
	serial_signature: String,

});


// create the model for users and expose it to our app
var Student = module.exports = mongoose.model('Student', studentSchema);


module.exports.getStudentByNumber = async (phoneNumber) => {
	try {
		const query = {
			phoneNumber: phoneNumber
		}
		let student = await Student.findOne(query)
		return student
	} catch (err) {
		throw err
	}
}

module.exports.getStudentByNumberForAuth = async (phoneNumber) => {
	try {
		const query = {
			phoneNumber: phoneNumber
		}
		let student = await Student.findOne(query).select('-sessions')
		return student
	} catch (err) {
		throw err
	}
}

module.exports.getStudentById = async (id) => {
	try {
		let student = await Student.findById(id)
		return student
	} catch (err) {
		throw err
	}
}

module.exports.getStudentByEmail = async (email) => {
	try {
		const query = {
			email: email
		}
		let student = await Student.findOne(query)
		return student
	} catch (err) {
		throw err
	}
}

module.exports.addStudent = async (name, email, phoneNumber, id, birthDate, group, photo) => {
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

				let student = new Student({
					name: name,
					phoneNumber: phoneNumber,
					birthDate: birthDate,
					group: group,
					email: email,
					id: id,
					image: imageurl,
					serial: "AAAAAAABEfsBAAAAAAAAAAABAVsOWNQ=",
					serial_signature: "qQwaiqobGUWliP03UFsAzAP1RjdxmVK+J9EltRnL1SV7sNvmG28zCoiACC2hJY4kOZlFbLCchrVA8SXZDGw1/Q=="
				})

				let newStudent = await student.save()
				return newStudent
			} else {

				let student = new Student({
					name: name,
					phoneNumber: phoneNumber,
					birthDate: birthDate,
					group: group,
					email: email,
					id: id,
					photo: "http://www.freelanceme.net/Images/default%20profile%20picture.png",
					serial: "AAAAAAABEfsBAAAAAAAAAAABAVsOWNQ=",
					serial_signature: "qQwaiqobGUWliP03UFsAzAP1RjdxmVK+J9EltRnL1SV7sNvmG28zCoiACC2hJY4kOZlFbLCchrVA8SXZDGw1/Q=="

				})

				let newStudent = await student.save()
				return newStudent
			}
		}
	} catch (err) {
		throw err
	}
}


module.exports.deleteStudent = async (id) => {
	try {
		let deletedStudent = Student.findByIdAndRemove(id)
		return deletedStudent
	} catch (err) {
		throw err
	}
}


module.exports.updateStudent = async (id, student) => {
	try {
		let updatedStudent = await Student.findOneAndUpdate({
			_id: id
		}, {
			$set: student
		}, {
			new: true,
			upsert: false
		})
		return updatedStudent
	} catch (err) {
		throw err
	}
}

module.exports.findSessionAndUpdate = async (sessions, id, status) => {
	try {
		let edit = false
		for(i = 0; i<=sessions.length+1; i++){
			if(sessions[i]._id == id){
				sessions[i].status = status
				edit = true
				return edit
			}

			if(i > sessions.length){
				return edit
			}
		}

	} catch (err) {
		throw err
	}
}

module.exports.findSessionAndUpdateAccessPoint = async (sessions, id, status) => {
	try {
		let edit = false
		for(i = 0; i<sessions.length; i++){
			if(sessions[i]._id == id && sessions[i].status == "pending"){
				sessions[i].status = status
				edit = true
				return edit
			}

			if(i > sessions.length){
				return edit
			}
		}

	} catch (err) {
		throw err
	}
}
