var mongoose = require('mongoose');
var Account = require('../models/account');
var Schema = mongoose.Schema;
var Admin = Account.base.models.Admin
var Teacher = Account.base.models.Teacher
var Student = Account.base.models.Student


// define the schema for the session model
var sessionSchema = new Schema({
  title: String,
  start_date: Date,
  location: String,
  chunk: Number,
  chunk_type: String,
  status: String,
  reader_serial: String,
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
  try {
    var start = semester_start;
    var end = semester_end;
    var newSessions = []

    var loop = new Date(start);
    var endloop = new Date(end);
    while (loop <= endloop) {
      if (loop.getDay() == day) {
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

        while (i <= students.length) {
          if (i == students.length) {
            break
          } else {
            let otherStudent = students[i]
            let student = await Student.getStudentById(otherStudent)
            if (student) {
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

    if (loop > endloop) {
      return newSessions
    }

  } catch (err) {
    throw err
  }
}

module.exports.findSessionsAssignedToTeacher = async (id) => {
  try {

    let students = await Student.find()
    var sessions2 = []

    if (students) {
      for (var i = 0; i < students.length; i++) {
        for (var j = 0; j < students[i].sessions.length; j++) {

          if (students[i].sessions[j].teacher == id) {
            if (sessions2.length == 0) {
              sessions2.push(students[i].sessions[j])
            } else {
              var found = sessions2.some(function(el) {
                return (el._id).equals(students[i].sessions[j]._id);
              });
              if (!found) {
                sessions2.push(students[i].sessions[j])
              }
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

    if (students) {
      for (var i = 0; i < students.length; i++) {
        for (var j = 0; j < students[i].sessions.length; j++) {
          if (students[i].sessions[j]._id.equals(id)) {
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
    if (students) {
      for (var i = 0; i < students.length; i++) {
        if ((students[i]._id).equals(student_id)) {
          for (var j = 0; j < students[i].sessions.length; j++) {
            if (students[i].sessions[j]._id.equals(session_id)) {
              if (students[i].sessions[j].status == "attended") {
                students[i].sessions[j].status = "not_attended"
              } else {
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

parseDay = async (number) => {
  try {
    if (number == 0) {
      return "Sunday"
    } else if (number == 1) {
      return "Monday"
    } else if (number == 2) {
      return "Tuesday"
    } else if (number == 3) {
      return "Wednesday"
    } else if (number == 4) {
      return "Thursday"
    } else if (number == 5) {
      return "Friday"
    } else if (number == 6) {
      return "Saturday"
    }
  } catch (err) {
    throw err
  }
}

parseMinutes = async (number) => {
  try {
    if (number <= 9) {
      return "0" + number
    } else {
      return number
    }
  } catch (err) {
    throw err
  }
}

formString = async (day, minutes, teacher, hours) => {
  try {
    return day + " " + hours + ":" + minutes + " - " + teacher
  } catch (err) {
    throw err
  }
}


module.exports.getAllSessions = async () => {
  try {
    var sessions = []
    let students = await Student.find()
    if (students) {
      for (var i = 0; i < students.length; i++) {
        for (var j = 0; j < (students[i].sessions).length; j++) {
          let teacher = await Teacher.getTeacherById(students[i].sessions[j].teacher)

          if (teacher) {
            let day = await parseDay(students[i].sessions[j].start_date.getDay())
            let minutes = await parseMinutes(students[i].sessions[j].start_date.getMinutes())
            let session_string = await formString(day, minutes, teacher.name, students[i].sessions[j].start_date.getHours())

            if (sessions.length > 0) {
              var session = -1;
              for(let k = 0; k<sessions.length; k++){
                if(sessions[k].title == students[i].sessions[j].title){
                  session = k
                }
              }
              if(session == -1){
                sessions.push({
                      title: students[i].sessions[j].title,
                      tutorials: [{
                        tutorial: session_string,
                        students: [{
                          _id: students[i]._id,
                          name: students[i].name
                        }],
                        dates: [{
                          _id: students[i].sessions[j]._id,
                          start_date: students[i].sessions[j].start_date
                        }]
                      }],

                    })
              }else{
                let tutorial = -1;
                for(let l = 0; l<(sessions[session].tutorials).length; l++){
                  if(sessions[session].tutorials[l].tutorial == session_string){
                    tutorial = l
                  }
                }
                if(tutorial == -1){
                  sessions[session].tutorials.push({
                    tutorial: session_string,
                    students: [{
                      _id: students[i]._id,
                      name: students[i].name
                    }],
                    dates: [{
                      _id: students[i].sessions[j]._id,
                      start_date: students[i].sessions[j].start_date
                    }]
                  })
                }else{
                  let student = -1;
                  for(let o = 0; o<(sessions[session].tutorials[tutorial].students).length; o++){
                    if(sessions[session].tutorials[tutorial].students[o]._id == students[i]._id){
                      student = o
                    }
                  }
                  if(student == -1){
                    sessions[session].tutorials[tutorial].students.push({
                              _id: students[i]._id,
                              name: students[i].name
                            })
                  }
                  let date = -1;
                  for(let q = 0; q<(sessions[session].tutorials[tutorial].dates).length; q++){
                    if(sessions[session].tutorials[tutorial].dates[q]._id.equals(students[i].sessions[j]._id)){
                      date = q
                    }
                  }
                  if(date == -1){
                    sessions[session].tutorials[tutorial].dates.push({
                      _id: students[i].sessions[j]._id,
                      start_date: students[i].sessions[j].start_date
                    })
                  }
                }
              }
            } else {
              /* sessions contains the element we're looking for */
              sessions.push({
                title: students[i].sessions[j].title,
                tutorials: [{
                  tutorial: session_string,
                  students: [{
                    _id: students[i]._id,
                    name: students[i].name
                  }],
                  dates: [{
                    _id: students[i].sessions[j]._id,
                    start_date: students[i].sessions[j].start_date
                  }]
                }]
              })
            }
          }

        }

      }

      return sessions
    } else {
      return sessions
    }
  } catch (err) {
    throw err
  }
}


// module.exports.getAllSessions = async () => {
//   try {
//     var sessions = []
//     let students = await Student.find()
//     if (students) {
//       for (var i = 0; i < students.length; i++) {
//         for (var j = 0; j < (students[i].sessions).length; j++) {
//           let teacher = await Teacher.getTeacherById(students[i].sessions[j].teacher)
//
//           if (teacher) {
//             let day = await parseDay(students[i].sessions[j].start_date.getDay())
//             let minutes = await parseMinutes(students[i].sessions[j].start_date.getMinutes())
//             let session_string = await formString(day, minutes, teacher.name, students[i].sessions[j].start_date.getHours())
//
//             if (sessions.length > 0) {
//               var session = -1;
//               for(let k = 0; k<sessions.length; k++){
//                 if(sessions[k].title == students[i].sessions[j].title){
//                   session = k
//                 }
//               }
//               if(session == -1){
//                 sessions.push({
//                       title: students[i].sessions[j].title,
//                       tutorials: [{
//                         tutorial: session_string,
//                         students: [{
//                           _id: students[i]._id,
//                           name: students[i].name
//                         }],
//                         dates: [{
//                           _id: students[i].sessions[j]._id,
//                           start_date: students[i].sessions[j].start_date
//                         }]
//                       }],
//
//                     })
//               }else{
//                 let tutorial = -1;
//                 for(let l = 0; l<(sessions[session].tutorials).length; l++){
//                   if(sessions[session].tutorials[l].tutorial == session_string){
//                     tutorial = l
//                   }
//                 }
//                 if(tutorial == -1){
//                   sessions[session].tutorials.push({
//                     tutorial: session_string,
//                     students: [{
//                       _id: students[i]._id,
//                       name: students[i].name
//                     }],
//                     dates: [{
//                       _id: students[i].sessions[j]._id,
//                       start_date: students[i].sessions[j].start_date
//                     }]
//                   })
//                 }else{
//                   let student = -1;
//                   for(let o = 0; o<(sessions[session].tutorials[tutorial].students).length; o++){
//                     if(sessions[session].tutorials[tutorial].students[o]._id == students[i]._id){
//                       student = o
//                     }
//                   }
//                   if(student == -1){
//                     sessions[session].tutorials[tutorial].students.push({
//                               _id: students[i]._id,
//                               name: students[i].name
//                             })
//                   }
//                   let date = -1;
//                   for(let q = 0; q<(sessions[session].tutorials[tutorial].dates).length; q++){
//                     if(sessions[session].tutorials[tutorial].dates[q]._id.equals(students[i].sessions[j]._id)){
//                       date = q
//                     }
//                   }
//                   if(date == -1){
//                     sessions[session].tutorials[tutorial].dates.push({
//                       _id: students[i].sessions[j]._id,
//                       start_date: students[i].sessions[j].start_date
//                     })
//                   }
//                 }
//               }
//             } else {
//               /* sessions contains the element we're looking for */
//               sessions.push({
//                 title: students[i].sessions[j].title,
//                 tutorials: [{
//                   tutorial: session_string,
//                   students: [{
//                     _id: students[i]._id,
//                     name: students[i].name
//                   }],
//                   dates: [{
//                     _id: students[i].sessions[j]._id,
//                     start_date: students[i].sessions[j].start_date
//                   }]
//                 }]
//               })
//             }
//           }
//
//         }
//
//       }
//
//       return sessions
//     } else {
//       return sessions
//     }
//   } catch (err) {
//     throw err
//   }
// }
