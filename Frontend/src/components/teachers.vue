<template>
  <div class="teachers" style="text-align:center;">
    <div class="log-form">
      <h2>Teachers</h2>

      <button type="button" v-on:click="add = true" class="btn btn-default" data-toggle="modal" data-target="#myModal">Add</button><br><br>

      <div class="ScrollStyle">
        <br>
        <ul v-for="teacher in teachers">
           <li><a style="cursor:pointer;" v-on:click="changeTeacherForDisplay(teacher)" data-toggle="modal" data-target="#myModal">{{teacher.name}}</a> <button class="btn btn-danger btn-sm" style="cursor:pointer;float:right; margin-right:2%" v-on:click="changeTeacherForDelete(teacher)">delete</button></li><br>
        </ul>
      </div>

      <br><router-link to="/"> <a style="cursor:pointer;">Back</a></router-link>

    </div><!--end log form -->


    <!-- Add teacher modal -->
  <div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div v-if="add == true"  class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Add teacher</h4>
        </div>
        <div class="modal-body">
          <form v-if="add == true"  @submit.prevent="addTeacher">
            <input title="first" placeholder="First Name" type="text" v-model="firstName" required/><br><br>
            <input type="text" title="last" placeholder="Last Name" v-model="lastName" required/><br><br>
            <input type="email" title="email" placeholder="Email" v-model="email" required/><br><br>
            <input type="tel" title="phoneNumber" placeholder="Phone Number" v-model="phoneNumber" required/><br><br>
            <input type="date" title="birthDate" placeholder="Birth Date" v-model="birthDate" required/><br><br>

            <button type="submit" class="btn btn-info">Add</button>
          </form>
          <div v-if="add == false">
            <h3> General Info. </h3>
            <p>{{current_teacher.name}}</p>
            <p>{{current_teacher.birthDate}}</p>
            <br>
            <br>
            <h3> Contact </h3>
            <p>{{current_teacher.phoneNumber}}</p>
            <p>{{current_teacher.email}}</p>
            <br>
            <br>


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
  name: 'teachers',
  data() {
    return {
      add: "",
      teachers: [],
      current_teacher:"",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      birthDate: "",

    }
  },
  created() {
    this.url = env.URL
    this.fetchTeachers()
  },

  methods: {
    fetchTeachers: function() {
      this.$http.get(env.URL + '/admin/teachers', {headers: auth.getAuthHeader()}).then((response) => {
        if (response.body.data) {
          this.teachers = response.body.data.teachers
        } else {
          this.error = response.body.msg
        }
      })
    },
    logout: function() {
      auth.logout();
    },

    addTeacher: function() {
      this.$http.post(env.URL + '/admin/teacher', {
      	firstName: this.firstName,
      	lastName: this.lastName,
      	email: this.email,
      	phoneNumber: this.phoneNumber,
      	birthDate: this.birthDate,
      }, {headers: auth.getAuthHeader()}).then((response) => {
            console.log(response)
            if(response.data){
              alertify.notify("Teacher added", 'success', 5);
              this.fetchTeachers()
            }else{
              alertify.notify(response.body.msg, 'error', 5);
            }
           }).catch((error) => {
             if(error.body.error.message != null){
               alertify.notify(error.body.error.message, 'error', 5);
             }
      })
     },

     deleteTeacher: function(){
       this.$http.delete(env.URL + '/admin/teacher/' + this.current_teacher._id, {headers: auth.getAuthHeader()}).then((response) => {
               this.fetchTeachers()
            }).catch((error) => {
              if(error.body.error.message != null){
                alertify.notify(error.body.error.message, 'error', 5);
              }
       })
     },

    changeTeacherForDisplay: function(teacher) {
      this.add = false;
      this.current_teacher = teacher;
    },

    changeTeacherForDelete: function(teacher) {
      this.current_teacher = teacher;
      this.deleteTeacher()
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
