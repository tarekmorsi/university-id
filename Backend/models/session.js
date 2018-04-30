var mongoose = require('mongoose');
var Student = require('../models/student');
var Schema = mongoose.Schema;

// define the schema for the session model
var sessionSchema = new Schema({
    title: String,
    start_date: Date,
    location: String,
    chunk: Number,
    chunk_type: String,
    status: String,
    reader_serial:String,
});


// create the model for sessions and expose it to our app
var Session = module.exports = mongoose.model('Session', sessionSchema);

module.exports.addSession = async (title, start_date, location, chunk, chunk_type, status, reader_serial) => {
	try {
		let session = new Session({
			title: title,
			start_date: start_date,
			location: location,
      chunk: chunk,
      chunk_type: chunk_type,
      status: status,
      reader_serial: reader_serial
		})
    let newSession = await session.save()
    return newSession
	} catch (err) {
		throw err
	}
}


module.exports.deleteSession = async (id) => {
	try {
		let deletedSession = Session.findByIdAndRemove(id)
		return deletedSession
	} catch (err) {
		throw err
	}
}


module.exports.generateSessions = async (title, day, hour, minutes, location, chunk, chunk_type, semester_start, semester_end, reader_serial, students) => {
  try{
    var start = semester_start;
    var end = semester_end;
    var newSessions = []

    var loop = new Date(start);
    var endloop = new Date(end);
    while(loop <= endloop){
      if(loop.getDay() == day){
        let start_date = loop.setHours(hour, minutes, 0);
        let session = new Session({
    			title: title,
    			start_date: start_date,
    			location: location,
          chunk: chunk,
          chunk_type: chunk_type,
          status: "pending",
          reader_serial: reader_serial,
    		})

        //
        // let newSession = await session.save()

        let i = 0

        while(i<=students.length){
          if(i==students.length){
            break
          }else{
            let otherStudent = students[i]
            let student = await Student.getStudentById(otherStudent)
            if(student){
              student.sessions.push(session)
              await student.save()
            }
            newSessions.push(session)
            i++;
          }
        }

      }

       var newDate = loop.setDate(loop.getDate() + 1);
       loop = new Date(newDate);
    }

    if(loop>endloop){
      return newSessions
    }

  } catch(err){
    throw err
  }
}
