const cloudinary = require('cloudinary');
const multer = require('multer');
const mime = require('mime');
const crypto = require('crypto');

const API_KEY = '923884447113998'
const API_SECRET = 'OV8lbV992PECMldsd3DON0lpTxI'


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/uploads/')
	},
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
		})
	}

})

const upload = multer({
	storage: storage
})

module.exports.upload = upload;

cloudinary.config({
	cloud_name: 'university-attendance-system',
	api_key: API_KEY,
	api_secret: API_SECRET
});


async function uploadToWeb(image) {
	try {
		let response = await cloudinary.uploader.upload('./public/uploads/' + image)
		return response.url
	} catch (err) {
		throw err
	}
}

module.exports.uploadToWeb = uploadToWeb;
