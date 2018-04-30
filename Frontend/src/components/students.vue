<template>
  <div class="students" style="text-align:center;">
    <div class="log-form">
      <h2>Students</h2>

      <button type="button" v-on:click="add = true" class="btn btn-default" data-toggle="modal" data-target="#myModal">Add</button><br><br>

      <div class="ScrollStyle">
        <br>
        <ul v-for="student in students">
           <li><a style="cursor:pointer;" v-on:click="changeStudentForDisplay(student)" data-toggle="modal" data-target="#myModal">{{student.name}}</a> <button class="btn btn-danger btn-sm" style="cursor:pointer;float:right; margin-right:2%" v-on:click="changeStudentForDelete(student)">delete</button></li><br>
        </ul>
      </div>

      <br><router-link to="/"> <a style="cursor:pointer;">Back</a></router-link>

    </div><!--end log form -->


    <!-- Add student modal -->
  <div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div v-if="add == true"  class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Add student</h4>
        </div>
        <div class="modal-body">
          <form v-if="add == true"  @submit.prevent="addStudent">
            <input title="first" placeholder="First Name" type="text" v-model="firstName" required/><br><br>
            <input type="text" title="last" placeholder="Last Name" v-model="lastName" required/><br><br>
            <input type="email" title="email" placeholder="Email" v-model="email" required/><br><br>
            <input type="tel" title="phoneNumber" placeholder="Phone Number" v-model="phoneNumber" required/><br><br>
            <input type="date" title="birthDate" placeholder="Birth Date" v-model="birthDate" required/><br><br>
            <input type="text" title="group" placeholder="Group" v-model="group" required/><br><br>
            <input type="text" title="id" placeholder="ID" v-model="id" required/><br><br>

            <button type="submit" class="btn btn-info">Add</button>
          </form>
          <div v-if="add == false">
            <h3> General Info. </h3>
            <p>{{current_student.name}}</p>
            <p>{{current_student.birthDate}}</p>
            <br>
            <br>
            <h3> Contact </h3>
            <p>{{current_student.phoneNumber}}</p>
            <p>{{current_student.email}}</p>
            <br>
            <br>
            <h3> Academic Info. </h3>
            <p>{{current_student.id}}</p>
            <p>{{current_student.group}}</p>

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
      students: [],
      current_student:"",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      birthDate: "",
      group: "",
      id: "",
    }
  },
  created() {
    this.url = env.URL
    this.fetchStudents()
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
    logout: function() {
      auth.logout();
    },

    addStudent: function() {
      this.$http.post(env.URL + '/admin/student', {
      	firstName: this.firstName,
      	lastName: this.lastName,
      	email: this.email,
      	phoneNumber: this.phoneNumber,
      	birthDate: this.birthDate,
      	group: this.group,
      	id: this.id
      }, {headers: auth.getAuthHeader()}).then((response) => {
            console.log(response)
            if(response.data){
              alertify.notify("Student added", 'success', 5);
              this.fetchStudents()
            }else{
              alertify.notify(response.body.msg, 'error', 5);
            }
           }).catch((error) => {
             if(error.body.error.message != null){
               alertify.notify(error.body.error.message, 'error', 5);
             }
      })
     },

     deleteStudent: function(){
       this.$http.delete(env.URL + '/admin/student/' + this.current_student._id, {headers: auth.getAuthHeader()}).then((response) => {
               this.fetchStudents()
            }).catch((error) => {
              if(error.body.error.message != null){
                alertify.notify(error.body.error.message, 'error', 5);
              }
       })
     },

    changeStudentForDisplay: function(student) {
      this.add = false;
      this.current_student = student;
    },

    changeStudentForDelete: function(student) {
      this.current_student = student;
      this.deleteStudent()
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
</style>
