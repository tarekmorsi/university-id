<template>
  <div class="sessions" style="text-align:center;">
    <div class="log-form">
      <h2>Sessions</h2>

      <button type="button" v-on:click="show = 1" class="btn btn-default" data-toggle="modal" data-target="#myModal">Add Sessions</button><br><br>

      <div class="ScrollStyle">
        <br>
        <ul v-for="course in courses">
           <li><a style="cursor:pointer;" v-on:click="changeCourseForDisplay(course)" data-toggle="modal" data-target="#myModal">{{course.title}}</a></li><br>
        </ul>
      </div>

      <br><router-link to="/"> <a style="cursor:pointer;">Back</a></router-link>

    </div><!--end log form -->


    <!-- Add student modal -->
  <div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div v-if="show == 1"  class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Add Sessions</h4>
        </div>
        <div class="modal-body">
          <form v-if="show == 1"  @submit.prevent="addSessions">
            <input title="text" placeholder="Title" type="text" v-model="title" required/><br><br>
            <input type="text" title="location" placeholder="Location" v-model="location" required/><br><br>

            <select name="day" v-model="day" required>
                  <option value="" selected disabled hidden>Choose here</option>
                  <option value="0">Sunday</option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
            </select><br><br>

            <input type="time" title="time" placeholder="Time" v-model="time" required/><br><br>
            <input type="number" title="chunk" placeholder="Chunk" v-model="chunk" required/>

            <select name="chunk_type" v-model="chunk_type" required>
                  <option value="" selected disabled hidden>Choose here</option>
                  <option value="hours">Hours</option>
                  <option value="minutes">Minutes</option>
                  <option value="seconds">Seconds</option>
            </select><br><br>

            <input type="date" title="semester_start" placeholder="Semester Start" v-model="semester_start" required/><br><br>
            <input type="date" title="semester_end" placeholder="Semester End" v-model="semester_end" required/><br><br>
            <input title="text" placeholder="Reader Serial" type="text" v-model="reader_serial" required/><br><br>



            <div class="ScrollStyle2">
              <div v-for="teacher in teachers">
              <input type="radio" name="" v-bind:value="teacher._id" v-model="selected_teacher">  <label>{{teacher.name}}</label> <br>
            </div>
          </div><br><br>

            <div class="ScrollStyle2">
              <div v-for="student in students">
              <input type="checkbox" name="" v-bind:value="student._id" v-model="selected_students">  <label>{{student.name}}</label> <br>
            </div>
          </div><br><br>




            <button type="submit" class="btn btn-info">Add</button>
          </form>
          <div v-if="show == 2">

            <h3>Course Name</h3>
            <p>{{current_course.title}}</p>

            <h3> Tutorials </h3>
            <div class="ScrollStyle3">
              <br>
              <ul v-for="tutorial in current_course.tutorials">
                 <li><a style="cursor:pointer;" v-on:click="changeTutorialForDisplay(tutorial)">{{tutorial.tutorial}}</a></li><br>
              </ul>
            </div>

          </div>

          <div v-if="show == 3">

            <h3>Tutorial Name</h3>
            <p>{{current_tutorial.tutorial}}</p>

            <h3> Tutorials </h3>
            <div class="ScrollStyle3">
              <br>
              <ul v-for="date in current_tutorial.dates">
                 <li><a style="cursor:pointer;">{{date.start_date}}</a></li><br>
              </ul>
            </div>

            <div class="ScrollStyle3">
              <br>
              <ul v-for="student in current_tutorial.students">
                 <li><a style="cursor:pointer;">{{student.name}}</a></li><br>
              </ul>
            </div>

            <br><br><a style="cursor:pointer;" v-on:click="show = 2">Back</a>


          </div>
        </div>
      </div>

    </div>
  </div>


  </div>





</template>

<script>

import env from '../env'
import auth from '../auth'
import router from '../router'
export default {
  name: 'students',
  data() {
    return {
      add: "",
      courses: [],
      students: [],
      teachers:[],
      current_course:"",
      current_tutorial:"",
      title: "",
      chunk:"",
      chunk_type:"",
      semester_start:"",
      semester_end:"",
      time:"",
      day:"",
      location:"",
      reader_serial:"",
      selected_students:[],
      selected_teacher:"",
      students_in_session: [],
      show: 0,

    }
  },
  created() {
    this.url = env.URL
    this.fetchStudents()
    this.fetchTeachers()
    this.fetchSessions()
  },

  methods: {
    fetchStudents: function() {
      this.$http.get(env.URL + '/admin/students', {headers: auth.getAuthHeader()}).then((response) => {
        if (response.body.data) {
          this.students = response.body.data.students
        } else {
          this.error = response.body.msg
        }
      })
    },
    fetchTeachers: function() {
      this.$http.get(env.URL + '/admin/teachers', {headers: auth.getAuthHeader()}).then((response) => {
        if (response.body.data) {
          this.teachers = response.body.data.teachers
        } else {
          this.error = response.body.msg
        }
      })
    },
    fetchSessions: function() {
      this.$http.get(env.URL + '/admin/sessions', {headers: auth.getAuthHeader()}).then((response) => {
        if (response.body.data) {
          this.courses = response.body.data.sessions
        } else {
          this.error = response.body.msg
        }
      })
    },
    logout: function() {
      auth.logout();
    },

    addSessions: function() {
      console.log(this.selected_students)
      var hour = Number(this.time.slice(0, 2))
      if(hour+2>24){
        var hour_total = hour + 2
        hour = hour_total - 24
      }else{
        hour = hour +2
      }

      this.$http.post(env.URL + '/admin/sessions', {
      	title: this.title,
      	location: this.location,
      	day: this.day,
      	hour: hour,
      	minutes: this.time.slice(3, 5),
      	chunk: this.chunk,
      	chunk_type: this.chunk_type,
        semester_start: this.semester_start,
        semester_end: this.semester_end,
        reader_serial: this.reader_serial,
        students: this.selected_students,
        teacher: this.selected_teacher
      }, {headers: auth.getAuthHeader()}).then((response) => {
            if(response.data){
              alertify.notify("Sessions added", 'success', 5);
              this.fetchStudents()
            }else{
              alertify.notify(response.body.msg, 'error', 5);
            }
           }).catch((error) => {
             if(error.body.error.message != null && error.body.error.message != undefined){
               alertify.notify(error.body.error.message, 'error', 5);
             }
      })
     },


    changeCourseForDisplay: function(course) {
      this.show = 2;
      this.current_course = course;
    },

    changeStudentForDelete: function(student) {
      this.current_student = student;
      this.deleteStudent()
    },

    changeTutorialForDisplay: function(tutorial){
      this.current_tutorial = tutorial;
      this.show = 3
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ScrollStyle
{
    border:1px solid black;
    max-height: 100%;
    overflow-y: scroll;
    width: 40%;
    margin: 0 auto;
}

.ScrollStyle2
{
    border:1px solid black;
    max-height: 150px;
    overflow-y: scroll;
    width: 40%;
    margin: 0 auto;
}
.ScrollStyle3
{
    border:1px solid black;
    max-height: 150px;
    overflow-y: scroll;
    width: 100%;
    margin: 0 auto;
}
</style>
