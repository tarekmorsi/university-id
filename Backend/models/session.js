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
    teacher: String
});


// create the model for sessions and expose it to our app
var Session = module.exports = mongoose.model('Session', sessionSchema);

module.exports.addSession = async (title, start_date, location, chunk, chunk_type, status, reader_serial, teacher) => {
	try {
		let session = new Session({
			title: title,
			start_date: start_date,
			location: location,
      chunk: chunk,
      chunk_type: chunk_type,
      status: status,
      reader_serial: reader_serial,
      teacher: teacher
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


module.exports.generateSessions = async (title, day, hour, minutes, location, chunk, chunk_type, semester_start, semester_end, reader_serial, students, teacher) => {
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
          teacher: teacher
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

module.exports.findSessionsAssignedToTeacher = async (id) => {
	try {

    let students = await Student.find()
    var sessions2 = []

    if(students){
      for(var i = 0; i<students.length; i++){
        for(var j = 0; j<students[i].sessions.length; j++){

          if(students[i].sessions[j].teacher = id){
            if(sessions2.length == 0){
              sessions2.push(students[i].sessions[j])
            }else{
              var found = sessions2.some(function (el) {
                return (el._id).equals(students[i].sessions[j]._id);
              });
              if (!found) { sessions2.push(students[i].sessions[j])}
            }
          }
        }
      }

      return sessions2
    }
	} catch (err) {
		throw err
	}
}


module.exports.findStudentsForSession = async (id) => {
  try {

    let students = await Student.find()
    var students_list = []

    if(students){
      for(var i = 0; i<students.length; i++){
        for(var j = 0; j<students[i].sessions.length; j++){
          if(students[i].sessions[j]._id.equals(id)){
            students_list.push(students[i])
          }
        }
      }

      return students_list
    }
	} catch (err) {
		throw err
	}
}

module.exports.editSessionForStudent = async (session_id, student_id) => {
  try {

    let students = await Student.find()
    if(students){
      for(var i = 0; i<students.length; i++){
        if((students[i]._id).equals(student_id)){
          for(var j = 0; j<students[i].sessions.length; j++){
            if(students[i].sessions[j]._id.equals(session_id)){
              if(students[i].sessions[j].status == "attended"){
                students[i].sessions[j].status = "not_attended"
              }else{
                students[i].sessions[j].status = "attended"
              }
              let student = await Student.updateStudent(students[i]._id, students[i])
              return student
            }
          }
        }
      }

    }
	} catch (err) {
		throw err
	}
}
