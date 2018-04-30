var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-promise');
var generatePassword = require('password-generator'); // a dependency that generates random password

// define the schema for our user model
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
