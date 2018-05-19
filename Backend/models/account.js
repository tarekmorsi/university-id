var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-promise');
var generatePassword = require('password-generator'); // a dependency that generates random password
var imageUpload = require('../config/imageUpload');

// define the schema for our admin model
var adminSchema = new Schema({
	email: {
		type: String,
		unique: true,
	},
	password: String,
	isSuper: Boolean,
});


// create the model for users and expose it to our app
var Admin = module.exports = mongoose.model('Admin', adminSchema);


module.exports.getAdminByEmail = async (email) => {
	try {
		const query = {
			email: email
		}
		let admin = await Admin.findOne(query)
		return admin
	} catch (err) {
		throw err
	}
}

module.exports.getAdminById = async (id) => {
	try {
		let admin = await Admin.findById(id)
		return admin
	} catch (err) {
		throw err
	}
}

module.exports.addAdmin = async (email, isSuper) => {
	try {
		const password = await generatePassword()
		const mailOptions = {
			from: ' "PassApp University" <passappuniversity@gmail.com>', // sender address
			to: email, // list of receivers
			subject: 'System Approval ✔', // Subject line
			text: `Congratulations! You have been added as an admin and now
                you can login using your email and password:${
                  password}`, // plain text body
		}
		let admin = new Admin({
			email: email,
			password: password,
			isSuper: isSuper
		})
		let newAdmin = await Admin.updatePassword(admin)
		let info = await mailController.sendMail(mailOptions)
		return newAdmin
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

module.exports.updatePassword = async (admin) => {
	try {
		let salt = await bcrypt.genSalt(10)
		let hash = await bcrypt.hash(admin.password, salt, null)
		admin.password = hash
		let newAdmin = await admin.save()
		return newAdmin
	} catch (err) {
		throw err
	}
}

module.exports.deleteAdmin = async (id) => {
	try {
		let deletedAdmin = Admin.findByIdAndRemove(id)
		return deletedAdmin
	} catch (err) {
		throw err
	}
}


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
		let teacher = await Teacher.getTeacherByEmail(email)
    let teacher2 = await Teacher.getTeacherByNumber(phoneNumber)
    let student = await Student.getStudentByEmail(email)
    let student2 = await Student.getStudentByNumber(phoneNumber)
    let admin = await Admin.getAdminByEmail(email)
		if(teacher || teacher2 || student || student2 || admin){
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
    let teacher = await Teacher.getTeacherByEmail(email)
    let teacher2 = await Teacher.getTeacherByNumber(phoneNumber)
    let student = await Student.getStudentByEmail(email)
    let student2 = await Student.getStudentByNumber(phoneNumber)
    let admin = await Admin.getAdminByEmail(email)
		if(teacher || teacher2 || student || student2 || admin){
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
    await Teacher.deleteAllTeacherSession(id)

		let deletedTeacher = Teacher.findByIdAndRemove(id)
		return deletedTeacher
	} catch (err) {
		throw err
	}
}

module.exports.deleteAllTeacherSession = async (teacher_id) => {
  try {

    let students = await Student.find()
    if(students){
      for(var i = 0; i<students.length; i++){
        for(var j = 0; j< students[i].sessions.length; j++){
          if(students[i].sessions[j].teacher == teacher_id){
            students[i].sessions.splice(j, 1);
            await students[i].save()
          }
        }
      }

    }
	} catch (err) {
		throw err
	}
}
