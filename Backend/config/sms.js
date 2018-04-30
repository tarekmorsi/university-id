const request = require('request-promise')
const API_KEY = '1bJBuwNhxiHBjZqbwnBy4XiOLtFx2fR2'

module.exports.sendSMS = async (phoneNumber) => {
	try {
		let options = {
			url: "https://api.authy.com/protected/json/phones/verification/start?api_key=" + API_KEY,
			body: {
				"via": "sms",
				"country_code": 20,
				"phone_number": phoneNumber
			},
			json: true
		}
		let response = await request.post(options)
		return response
	} catch (err) {
		throw err
	}
}

module.exports.verify = async (phoneNumber, code) => {
	try {
		let options = {
			url: "https://api.authy.com/protected/json/phones/verification/check?api_key=" + API_KEY + "&phone_number=" + phoneNumber + "&country_code=" + 20 + "&verification_code=" + code,
			json: true
		}
		let response = await request.get(options)
		return response
	} catch (err) {
		throw err
	}
}