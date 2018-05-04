var nodemailer = require('nodemailer') // a dependency that sends an email to user
var mail = require('../config/mail')

const transporter = nodemailer.createTransport({
	service: mail.service,
	auth: mail.auth
})

var mailController = {
	/**
	 * Send mail
	 * @param {String} mailOptions
	 */
	async sendMail2(mailOptions) {
		try {
			let info = await transporter.sendMail(mailOptions)
		} catch (err) {
			throw err
		}
	}
}

module.exports = mailController;
