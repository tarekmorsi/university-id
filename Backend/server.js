var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cors = require('cors')
var passport = require('passport')
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
var config = require('./config/database')
var expressValidator = require('express-validator');

var app = express()



// Port number
var port = (process.env.PORT || 3000)

// Connect to database
mongoose.connect(config.database)

// On Connection
mongoose.connection.on('connected', () => {
	console.log('Connected to database ' + config.database)
})

// On Error
mongoose.connection.on('error', (err) => {
	console.log('Database error: ' + err)
})

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// CORS Middleware
app.use(cors())

// Body Parser Middleware
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())

// Express validator
app.use(expressValidator())

// Passport Middleware
app.use(passport.initialize())

// ALLOWING FRONT END TO COMMUNICATEs
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
});

// Routes

var adminRoutes = require('./routes/adminRoutes')
var studentRoutes = require('./routes/studentRoutes')

app.use('/admin', adminRoutes)
app.use('/student', studentRoutes)

// Starting the server
app.listen(port, () => {
	console.log('Server started on port ' + port)
})
