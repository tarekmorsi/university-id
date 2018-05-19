webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_resource__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_carousel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_carousel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_carousel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_carousel_3d__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_carousel_3d___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_carousel_3d__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_home__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_home___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_home__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_students__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_students___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_students__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_teachers__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_teachers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_teachers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_sessions__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_sessions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_sessions__);












__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_2_vue_resource__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  mode: 'history',
  base: __dirname,
  routes: [{
    path: '/',
    name: 'home',
    component: __WEBPACK_IMPORTED_MODULE_6__components_home___default.a
  }, {
    path: '/students/',
    name: 'students',
    component: __WEBPACK_IMPORTED_MODULE_7__components_students___default.a,
    beforeEnter: (to, from, next) => {
      __WEBPACK_IMPORTED_MODULE_5__auth__["a" /* default */].checkAuth();
      if (!__WEBPACK_IMPORTED_MODULE_5__auth__["a" /* default */].user.authenticated) {
        next('/');
      } else {
        next();
      }
    }
  }, {
    path: '/teachers/',
    name: 'teachers',
    component: __WEBPACK_IMPORTED_MODULE_8__components_teachers___default.a,
    beforeEnter: (to, from, next) => {
      __WEBPACK_IMPORTED_MODULE_5__auth__["a" /* default */].checkAuth();
      if (!__WEBPACK_IMPORTED_MODULE_5__auth__["a" /* default */].user.authenticated) {
        next('/');
      } else {
        next();
      }
    }
  }, {
    path: '/sessions/',
    name: 'sessions',
    component: __WEBPACK_IMPORTED_MODULE_9__components_sessions___default.a,
    beforeEnter: (to, from, next) => {
      __WEBPACK_IMPORTED_MODULE_5__auth__["a" /* default */].checkAuth();
      if (!__WEBPACK_IMPORTED_MODULE_5__auth__["a" /* default */].user.authenticated) {
        next('/');
      } else {
        next();
      }
    }
  }]
}));
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "/"))

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(0);


const API_URL = 'http://localhost:3000/';
const LOGIN_URL = API_URL + 'authenticate/';
// const SIGNUP_URL = API_URL + 'users/'

/* harmony default export */ __webpack_exports__["a"] = ({

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  login(data) {
    localStorage.setItem('token', data.token);

    localStorage.setItem('admin', data.admin);

    this.user.authenticated = true;
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('token');

    localStorage.removeItem('admin');

    this.user.authenticated = false;
  },

  checkAuth() {
    var jwt = localStorage.getItem('token');
    if (jwt) {
      this.user.authenticated = true;
    } else {
      this.user.authenticated = false;
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'jwt-token': localStorage.getItem('token')
    };
  },
  getAdmin() {
    return JSON.parse(localStorage.getItem('admin'));
  },
  getAdminType() {
    return JSON.parse(localStorage.getItem('admin')).isSuper;
  }

});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
  URL: "http://localhost:3000" //Backend http://localhost:3000
};

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__App__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.



__webpack_require__(41).install();

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */],
  template: '<App/>',
  components: {
    App: __WEBPACK_IMPORTED_MODULE_2__App___default.a
  }
});

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(13)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(16),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-38307d84",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__env__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({

  name: 'home',
  data() {
    return {
      email: "",
      password: "",
      user: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].user,
      home: true
    };
  },

  methods: {
    // Send a request to the login URL and save the returned JWT
    login: function () {
      console.log(this.email);

      this.$http.post(__WEBPACK_IMPORTED_MODULE_0__env___default.a.URL + '/admin/authenticate', {
        email: this.email,
        password: this.password
      }).then(response => {
        let data = {
          token: response.body.data.token,
          admin: JSON.stringify(response.body.data.admin)
        };
        __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].login(data);
      }).catch(error => {
        if (error.body.msg instanceof String || typeof error.body.msg === "string") {
          swal('Oops...', error.body.msg, 'error');
        } else {
          for (var i = 0; i < error.body.msg.length; i++) {
            var msg = error.body.msg[i].msg;
            alertify.notify(msg, 'error', 5);
          }
        }
      });
    },

    logout: function () {
      __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].logout();
    }
  },
  created() {},
  components: {}
});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (!_vm.user.authenticated) ? _c('div', {
    staticClass: "home",
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('div', {
    staticClass: "log-form"
  }, [_c('h2', [_vm._v("Login to your account")]), _vm._v(" "), _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.login($event)
      }
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.email),
      expression: "email"
    }],
    attrs: {
      "title": "email",
      "placeholder": "email",
      "type": "email",
      "required": ""
    },
    domProps: {
      "value": (_vm.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.email = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.password),
      expression: "password"
    }],
    attrs: {
      "type": "password",
      "title": "password",
      "placeholder": "password",
      "required": ""
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value
      }
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "btn",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("Login")])])])]) : _c('div', {
    staticClass: "home",
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('div', {
    staticClass: "log-form"
  }, [_c('router-link', {
    attrs: {
      "to": "/students"
    }
  }, [_c('a', {
    staticStyle: {
      "cursor": "pointer"
    }
  }, [_vm._v("Students")])]), _c('br'), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/teachers"
    }
  }, [_c('a', {
    staticStyle: {
      "cursor": "pointer"
    }
  }, [_vm._v("Teachers")])]), _c('br'), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/sessions"
    }
  }, [_c('a', {
    staticStyle: {
      "cursor": "pointer"
    }
  }, [_vm._v("Sessions")])]), _c('br'), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_c('a', {
    staticStyle: {
      "cursor": "pointer"
    },
    on: {
      "click": _vm.logout
    }
  }, [_vm._v("Logout")])])], 1)])
},staticRenderFns: []}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(18)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(20),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2fff91f7",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__env__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'students',
  data() {
    return {
      add: "",
      students: [],
      current_student: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      birthDate: "",
      group: "",
      id: ""
    };
  },
  created() {
    this.url = __WEBPACK_IMPORTED_MODULE_0__env___default.a.URL;
    this.fetchStudents();
  },

  methods: {
    fetchStudents: function () {
      this.$http.get(__WEBPACK_IMPORTED_MODULE_0__env___default.a.URL + '/admin/students', { headers: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].getAuthHeader() }).then(response => {
        if (response.body.data) {
          this.students = response.body.data.students;
        } else {
          this.error = response.body.msg;
        }
      });
    },
    logout: function () {
      __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].logout();
    },

    addStudent: function () {
      this.$http.post(__WEBPACK_IMPORTED_MODULE_0__env___default.a.URL + '/admin/student', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        birthDate: this.birthDate,
        group: this.group,
        id: this.id
      }, { headers: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].getAuthHeader() }).then(response => {
        console.log(response);
        if (response.data) {
          alertify.notify("Student added", 'success', 5);
          this.fetchStudents();
        } else {
          alertify.notify(response.body.msg, 'error', 5);
        }
      }).catch(error => {
        if (error.body.error.message != null) {
          alertify.notify(error.body.error.message, 'error', 5);
        }
      });
    },

    deleteStudent: function () {
      this.$http.delete(__WEBPACK_IMPORTED_MODULE_0__env___default.a.URL + '/admin/student/' + this.current_student._id, { headers: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].getAuthHeader() }).then(response => {
        this.fetchStudents();
      }).catch(error => {
        if (error.body.error.message != null) {
          alertify.notify(error.body.error.message, 'error', 5);
        }
      });
    },

    changeStudentForDisplay: function (student) {
      this.add = false;
      this.current_student = student;
    },

    changeStudentForDelete: function (student) {
      this.current_student = student;
      this.deleteStudent();
    }
  },
  components: {}
});

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "students",
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('div', {
    staticClass: "log-form"
  }, [_c('h2', [_vm._v("Students")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "data-toggle": "modal",
      "data-target": "#myModal"
    },
    on: {
      "click": function($event) {
        _vm.add = true
      }
    }
  }, [_vm._v("Add")]), _c('br'), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "ScrollStyle"
  }, [_c('br'), _vm._v(" "), _vm._l((_vm.students), function(student) {
    return _c('ul', [_c('li', [_c('a', {
      staticStyle: {
        "cursor": "pointer"
      },
      attrs: {
        "data-toggle": "modal",
        "data-target": "#myModal"
      },
      on: {
        "click": function($event) {
          _vm.changeStudentForDisplay(student)
        }
      }
    }, [_vm._v(_vm._s(student.name))]), _vm._v(" "), _c('button', {
      staticClass: "btn btn-danger btn-sm",
      staticStyle: {
        "cursor": "pointer",
        "float": "right",
        "margin-right": "2%"
      },
      on: {
        "click": function($event) {
          _vm.changeStudentForDelete(student)
        }
      }
    }, [_vm._v("delete")])]), _c('br')])
  })], 2), _vm._v(" "), _c('br'), _c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_c('a', {
    staticStyle: {
      "cursor": "pointer"
    }
  }, [_vm._v("Back")])])], 1), _vm._v(" "), _c('div', {
    staticClass: "modal fade",
    attrs: {
      "id": "myModal",
      "role": "dialog"
    }
  }, [_c('div', {
    staticClass: "modal-dialog"
  }, [_c('div', {
    staticClass: "modal-content"
  }, [(_vm.add == true) ? _c('div', {
    staticClass: "modal-header"
  }, [_c('button', {
    staticClass: "close",
    attrs: {
      "type": "button",
      "data-dismiss": "modal"
    }
  }, [_vm._v("×")]), _vm._v(" "), _c('h4', {
    staticClass: "modal-title"
  }, [_vm._v("Add student")])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [(_vm.add == true) ? _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.addStudent($event)
      }
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.firstName),
      expression: "firstName"
    }],
    attrs: {
      "title": "first",
      "placeholder": "First Name",
      "type": "text",
      "required": ""
    },
    domProps: {
      "value": (_vm.firstName)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.firstName = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.lastName),
      expression: "lastName"
    }],
    attrs: {
      "type": "text",
      "title": "last",
      "placeholder": "Last Name",
      "required": ""
    },
    domProps: {
      "value": (_vm.lastName)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.lastName = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.email),
      expression: "email"
    }],
    attrs: {
      "type": "email",
      "title": "email",
      "placeholder": "Email",
      "required": ""
    },
    domProps: {
      "value": (_vm.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.email = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.phoneNumber),
      expression: "phoneNumber"
    }],
    attrs: {
      "type": "tel",
      "title": "phoneNumber",
      "placeholder": "Phone Number",
      "required": ""
    },
    domProps: {
      "value": (_vm.phoneNumber)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.phoneNumber = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.birthDate),
      expression: "birthDate"
    }],
    attrs: {
      "type": "date",
      "title": "birthDate",
      "placeholder": "Birth Date",
      "required": ""
    },
    domProps: {
      "value": (_vm.birthDate)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.birthDate = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.group),
      expression: "group"
    }],
    attrs: {
      "type": "text",
      "title": "group",
      "placeholder": "Group",
      "required": ""
    },
    domProps: {
      "value": (_vm.group)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.group = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.id),
      expression: "id"
    }],
    attrs: {
      "type": "text",
      "title": "id",
      "placeholder": "ID",
      "required": ""
    },
    domProps: {
      "value": (_vm.id)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.id = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('button', {
    staticClass: "btn btn-info",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("Add")])]) : _vm._e(), _vm._v(" "), (_vm.add == false) ? _c('div', [_c('h3', [_vm._v(" General Info. ")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.current_student.name))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.current_student.birthDate))]), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(" Contact ")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.current_student.phoneNumber))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.current_student.email))]), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(" Academic Info. ")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.current_student.id))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.current_student.group))])]) : _vm._e()])])])])])
},staticRenderFns: []}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(22)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(23),
  /* template */
  __webpack_require__(24),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2c6b38b0",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__env__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'teachers',
  data() {
    return {
      add: "",
      teachers: [],
      current_teacher: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      birthDate: ""

    };
  },
  created() {
    this.url = __WEBPACK_IMPORTED_MODULE_0__env___default.a.URL;
    this.fetchTeachers();
  },

  methods: {
    fetchTeachers: function () {
      this.$http.get(__WEBPACK_IMPORTED_MODULE_0__env___default.a.URL + '/admin/teachers', { headers: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].getAuthHeader() }).then(response => {
        if (response.body.data) {
          this.teachers = response.body.data.teachers;
        } else {
          this.error = response.body.msg;
        }
      });
    },
    logout: function () {
      __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].logout();
    },

    addTeacher: function () {
      this.$http.post(__WEBPACK_IMPORTED_MODULE_0__env___default.a.URL + '/admin/teacher', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        birthDate: this.birthDate
      }, { headers: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].getAuthHeader() }).then(response => {
        console.log(response);
        if (response.data) {
          alertify.notify("Teacher added", 'success', 5);
          this.fetchTeachers();
        } else {
          alertify.notify(response.body.msg, 'error', 5);
        }
      }).catch(error => {
        if (error.body.error.message != null) {
          alertify.notify(error.body.error.message, 'error', 5);
        }
      });
    },

    deleteTeacher: function () {
      this.$http.delete(__WEBPACK_IMPORTED_MODULE_0__env___default.a.URL + '/admin/teacher/' + this.current_teacher._id, { headers: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].getAuthHeader() }).then(response => {
        this.fetchTeachers();
      }).catch(error => {
        if (error.body.error.message != null) {
          alertify.notify(error.body.error.message, 'error', 5);
        }
      });
    },

    changeTeacherForDisplay: function (teacher) {
      this.add = false;
      this.current_teacher = teacher;
    },

    changeTeacherForDelete: function (teacher) {
      this.current_teacher = teacher;
      this.deleteTeacher();
    }
  },
  components: {}
});

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "teachers",
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('div', {
    staticClass: "log-form"
  }, [_c('h2', [_vm._v("Teachers")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "data-toggle": "modal",
      "data-target": "#myModal"
    },
    on: {
      "click": function($event) {
        _vm.add = true
      }
    }
  }, [_vm._v("Add")]), _c('br'), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "ScrollStyle"
  }, [_c('br'), _vm._v(" "), _vm._l((_vm.teachers), function(teacher) {
    return _c('ul', [_c('li', [_c('a', {
      staticStyle: {
        "cursor": "pointer"
      },
      attrs: {
        "data-toggle": "modal",
        "data-target": "#myModal"
      },
      on: {
        "click": function($event) {
          _vm.changeTeacherForDisplay(teacher)
        }
      }
    }, [_vm._v(_vm._s(teacher.name))]), _vm._v(" "), _c('button', {
      staticClass: "btn btn-danger btn-sm",
      staticStyle: {
        "cursor": "pointer",
        "float": "right",
        "margin-right": "2%"
      },
      on: {
        "click": function($event) {
          _vm.changeTeacherForDelete(teacher)
        }
      }
    }, [_vm._v("delete")])]), _c('br')])
  })], 2), _vm._v(" "), _c('br'), _c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_c('a', {
    staticStyle: {
      "cursor": "pointer"
    }
  }, [_vm._v("Back")])])], 1), _vm._v(" "), _c('div', {
    staticClass: "modal fade",
    attrs: {
      "id": "myModal",
      "role": "dialog"
    }
  }, [_c('div', {
    staticClass: "modal-dialog"
  }, [_c('div', {
    staticClass: "modal-content"
  }, [(_vm.add == true) ? _c('div', {
    staticClass: "modal-header"
  }, [_c('button', {
    staticClass: "close",
    attrs: {
      "type": "button",
      "data-dismiss": "modal"
    }
  }, [_vm._v("×")]), _vm._v(" "), _c('h4', {
    staticClass: "modal-title"
  }, [_vm._v("Add teacher")])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [(_vm.add == true) ? _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.addTeacher($event)
      }
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.firstName),
      expression: "firstName"
    }],
    attrs: {
      "title": "first",
      "placeholder": "First Name",
      "type": "text",
      "required": ""
    },
    domProps: {
      "value": (_vm.firstName)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.firstName = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.lastName),
      expression: "lastName"
    }],
    attrs: {
      "type": "text",
      "title": "last",
      "placeholder": "Last Name",
      "required": ""
    },
    domProps: {
      "value": (_vm.lastName)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.lastName = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.email),
      expression: "email"
    }],
    attrs: {
      "type": "email",
      "title": "email",
      "placeholder": "Email",
      "required": ""
    },
    domProps: {
      "value": (_vm.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.email = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.phoneNumber),
      expression: "phoneNumber"
    }],
    attrs: {
      "type": "tel",
      "title": "phoneNumber",
      "placeholder": "Phone Number",
      "required": ""
    },
    domProps: {
      "value": (_vm.phoneNumber)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.phoneNumber = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.birthDate),
      expression: "birthDate"
    }],
    attrs: {
      "type": "date",
      "title": "birthDate",
      "placeholder": "Birth Date",
      "required": ""
    },
    domProps: {
      "value": (_vm.birthDate)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.birthDate = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('button', {
    staticClass: "btn btn-info",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("Add")])]) : _vm._e(), _vm._v(" "), (_vm.add == false) ? _c('div', [_c('h3', [_vm._v(" General Info. ")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.current_teacher.name))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.current_teacher.birthDate))]), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v(" Contact ")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.current_teacher.phoneNumber))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.current_teacher.email))]), _vm._v(" "), _c('br'), _vm._v(" "), _c('br')]) : _vm._e()])])])])])
},staticRenderFns: []}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(26)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(28),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0836927c",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__env__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(0);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'students',
  data() {
    return {
      add: "",
      courses: [],
      students: [],
      teachers: [],
      current_course: "",
      current_tutorial: "",
      title: "",
      chunk: "",
      chunk_type: "",
      semester_start: "",
      semester_end: "",
      time: "",
      day: "",
      location: "",
      reader_serial: "",
      selected_students: [],
      selected_teacher: "",
      students_in_session: [],
      show: 0

    };
  },
  created() {
    this.url = __WEBPACK_IMPORTED_MODULE_0__env___default.a.URL;
    this.fetchStudents();
    this.fetchTeachers();
    this.fetchSessions();
  },

  methods: {
    fetchStudents: function () {
      this.$http.get(__WEBPACK_IMPORTED_MODULE_0__env___default.a.URL + '/admin/students', { headers: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].getAuthHeader() }).then(response => {
        if (response.body.data) {
          this.students = response.body.data.students;
        } else {
          this.error = response.body.msg;
        }
      });
    },
    fetchTeachers: function () {
      this.$http.get(__WEBPACK_IMPORTED_MODULE_0__env___default.a.URL + '/admin/teachers', { headers: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].getAuthHeader() }).then(response => {
        if (response.body.data) {
          this.teachers = response.body.data.teachers;
        } else {
          this.error = response.body.msg;
        }
      });
    },
    fetchSessions: function () {
      this.$http.get(__WEBPACK_IMPORTED_MODULE_0__env___default.a.URL + '/admin/sessions', { headers: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].getAuthHeader() }).then(response => {
        if (response.body.data) {
          this.courses = response.body.data.sessions;
        } else {
          this.error = response.body.msg;
        }
      });
    },
    logout: function () {
      __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].logout();
    },

    addSessions: function () {
      console.log(this.selected_students);
      var hour = Number(this.time.slice(0, 2));
      if (hour + 2 > 24) {
        var hour_total = hour + 2;
        hour = hour_total - 24;
      } else {
        hour = hour + 2;
      }

      this.$http.post(__WEBPACK_IMPORTED_MODULE_0__env___default.a.URL + '/admin/sessions', {
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
      }, { headers: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].getAuthHeader() }).then(response => {
        if (response.data) {
          alertify.notify("Sessions added", 'success', 5);
          this.fetchStudents();
        } else {
          alertify.notify(response.body.msg, 'error', 5);
        }
      }).catch(error => {
        if (error.body.error.message != null && error.body.error.message != undefined) {
          alertify.notify(error.body.error.message, 'error', 5);
        }
      });
    },

    changeCourseForDisplay: function (course) {
      this.show = 2;
      this.current_course = course;
    },

    changeStudentForDelete: function (student) {
      this.current_student = student;
      this.deleteStudent();
    },

    changeTutorialForDisplay: function (tutorial) {
      this.current_tutorial = tutorial;
      this.show = 3;
    }
  },
  components: {}
});

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sessions",
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('div', {
    staticClass: "log-form"
  }, [_c('h2', [_vm._v("Sessions")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "data-toggle": "modal",
      "data-target": "#myModal"
    },
    on: {
      "click": function($event) {
        _vm.show = 1
      }
    }
  }, [_vm._v("Add Sessions")]), _c('br'), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "ScrollStyle"
  }, [_c('br'), _vm._v(" "), _vm._l((_vm.courses), function(course) {
    return _c('ul', [_c('li', [_c('a', {
      staticStyle: {
        "cursor": "pointer"
      },
      attrs: {
        "data-toggle": "modal",
        "data-target": "#myModal"
      },
      on: {
        "click": function($event) {
          _vm.changeCourseForDisplay(course)
        }
      }
    }, [_vm._v(_vm._s(course.title))])]), _c('br')])
  })], 2), _vm._v(" "), _c('br'), _c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_c('a', {
    staticStyle: {
      "cursor": "pointer"
    }
  }, [_vm._v("Back")])])], 1), _vm._v(" "), _c('div', {
    staticClass: "modal fade",
    attrs: {
      "id": "myModal",
      "role": "dialog"
    }
  }, [_c('div', {
    staticClass: "modal-dialog"
  }, [_c('div', {
    staticClass: "modal-content"
  }, [(_vm.show == 1) ? _c('div', {
    staticClass: "modal-header"
  }, [_c('button', {
    staticClass: "close",
    attrs: {
      "type": "button",
      "data-dismiss": "modal"
    }
  }, [_vm._v("×")]), _vm._v(" "), _c('h4', {
    staticClass: "modal-title"
  }, [_vm._v("Add Sessions")])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [(_vm.show == 1) ? _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.addSessions($event)
      }
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.title),
      expression: "title"
    }],
    attrs: {
      "title": "text",
      "placeholder": "Title",
      "type": "text",
      "required": ""
    },
    domProps: {
      "value": (_vm.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.title = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.location),
      expression: "location"
    }],
    attrs: {
      "type": "text",
      "title": "location",
      "placeholder": "Location",
      "required": ""
    },
    domProps: {
      "value": (_vm.location)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.location = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.day),
      expression: "day"
    }],
    attrs: {
      "name": "day",
      "required": ""
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.day = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "",
      "selected": "",
      "disabled": "",
      "hidden": ""
    }
  }, [_vm._v("Choose here")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "0"
    }
  }, [_vm._v("Sunday")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "1"
    }
  }, [_vm._v("Monday")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "2"
    }
  }, [_vm._v("Tuesday")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "3"
    }
  }, [_vm._v("Wednesday")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "4"
    }
  }, [_vm._v("Thursday")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "5"
    }
  }, [_vm._v("Friday")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "6"
    }
  }, [_vm._v("Saturday")])]), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.time),
      expression: "time"
    }],
    attrs: {
      "type": "time",
      "title": "time",
      "placeholder": "Time",
      "required": ""
    },
    domProps: {
      "value": (_vm.time)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.time = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.chunk),
      expression: "chunk"
    }],
    attrs: {
      "type": "number",
      "title": "chunk",
      "placeholder": "Chunk",
      "required": ""
    },
    domProps: {
      "value": (_vm.chunk)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.chunk = $event.target.value
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.chunk_type),
      expression: "chunk_type"
    }],
    attrs: {
      "name": "chunk_type",
      "required": ""
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.chunk_type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "",
      "selected": "",
      "disabled": "",
      "hidden": ""
    }
  }, [_vm._v("Choose here")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "hours"
    }
  }, [_vm._v("Hours")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "minutes"
    }
  }, [_vm._v("Minutes")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "seconds"
    }
  }, [_vm._v("Seconds")])]), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.semester_start),
      expression: "semester_start"
    }],
    attrs: {
      "type": "date",
      "title": "semester_start",
      "placeholder": "Semester Start",
      "required": ""
    },
    domProps: {
      "value": (_vm.semester_start)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.semester_start = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.semester_end),
      expression: "semester_end"
    }],
    attrs: {
      "type": "date",
      "title": "semester_end",
      "placeholder": "Semester End",
      "required": ""
    },
    domProps: {
      "value": (_vm.semester_end)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.semester_end = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.reader_serial),
      expression: "reader_serial"
    }],
    attrs: {
      "title": "text",
      "placeholder": "Reader Serial",
      "type": "text",
      "required": ""
    },
    domProps: {
      "value": (_vm.reader_serial)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.reader_serial = $event.target.value
      }
    }
  }), _c('br'), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "ScrollStyle2"
  }, _vm._l((_vm.teachers), function(teacher) {
    return _c('div', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.selected_teacher),
        expression: "selected_teacher"
      }],
      attrs: {
        "type": "radio",
        "name": ""
      },
      domProps: {
        "value": teacher._id,
        "checked": _vm._q(_vm.selected_teacher, teacher._id)
      },
      on: {
        "__c": function($event) {
          _vm.selected_teacher = teacher._id
        }
      }
    }), _vm._v(" "), _c('label', [_vm._v(_vm._s(teacher.name))]), _vm._v(" "), _c('br')])
  })), _c('br'), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "ScrollStyle2"
  }, _vm._l((_vm.students), function(student) {
    return _c('div', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.selected_students),
        expression: "selected_students"
      }],
      attrs: {
        "type": "checkbox",
        "name": ""
      },
      domProps: {
        "value": student._id,
        "checked": Array.isArray(_vm.selected_students) ? _vm._i(_vm.selected_students, student._id) > -1 : (_vm.selected_students)
      },
      on: {
        "__c": function($event) {
          var $$a = _vm.selected_students,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = student._id,
              $$i = _vm._i($$a, $$v);
            if ($$c) {
              $$i < 0 && (_vm.selected_students = $$a.concat($$v))
            } else {
              $$i > -1 && (_vm.selected_students = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            _vm.selected_students = $$c
          }
        }
      }
    }), _vm._v(" "), _c('label', [_vm._v(_vm._s(student.name))]), _vm._v(" "), _c('br')])
  })), _c('br'), _c('br'), _vm._v(" "), _c('button', {
    staticClass: "btn btn-info",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("Add")])]) : _vm._e(), _vm._v(" "), (_vm.show == 2) ? _c('div', [_c('h3', [_vm._v("Course Name")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.current_course.title))]), _vm._v(" "), _c('h3', [_vm._v(" Tutorials ")]), _vm._v(" "), _c('div', {
    staticClass: "ScrollStyle3"
  }, [_c('br'), _vm._v(" "), _vm._l((_vm.current_course.tutorials), function(tutorial) {
    return _c('ul', [_c('li', [_c('a', {
      staticStyle: {
        "cursor": "pointer"
      },
      on: {
        "click": function($event) {
          _vm.changeTutorialForDisplay(tutorial)
        }
      }
    }, [_vm._v(_vm._s(tutorial.tutorial))])]), _c('br')])
  })], 2)]) : _vm._e(), _vm._v(" "), (_vm.show == 3) ? _c('div', [_c('h3', [_vm._v("Tutorial Name")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.current_tutorial.tutorial))]), _vm._v(" "), _c('h3', [_vm._v(" Tutorials ")]), _vm._v(" "), _c('div', {
    staticClass: "ScrollStyle3"
  }, [_c('br'), _vm._v(" "), _vm._l((_vm.current_tutorial.dates), function(date) {
    return _c('ul', [_c('li', [_c('a', {
      staticStyle: {
        "cursor": "pointer"
      }
    }, [_vm._v(_vm._s(date.start_date))])]), _c('br')])
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "ScrollStyle3"
  }, [_c('br'), _vm._v(" "), _vm._l((_vm.current_tutorial.students), function(student) {
    return _c('ul', [_c('li', [_c('a', {
      staticStyle: {
        "cursor": "pointer"
      }
    }, [_vm._v(_vm._s(student.name))])]), _c('br')])
  })], 2), _vm._v(" "), _c('br'), _c('br'), _c('a', {
    staticStyle: {
      "cursor": "pointer"
    },
    on: {
      "click": function($event) {
        _vm.show = 2
      }
    }
  }, [_vm._v("Back")])]) : _vm._e()])])])])])
},staticRenderFns: []}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(30)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(31),
  /* template */
  __webpack_require__(40),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0db9a8f2",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav_vue__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AppNav_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AppFooter_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AppFooter_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__AppFooter_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(0);
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  components: {
    AppNav: __WEBPACK_IMPORTED_MODULE_0__AppNav_vue___default.a,
    AppFooter: __WEBPACK_IMPORTED_MODULE_1__AppFooter_vue___default.a
  },

  created: function () {
    var self = this;
    // self.initSlick();
  },

  methods: {},

  data() {
    return {
      admin: false,
      home: true

    };
  },
  updated() {

    if (this.$route.path === '/admin') {
      this.admin = true;
    } else if (this.$route.path === '/') {
      this.admin = false;
      this.home = true;
    } else {
      this.home = false;
    }
  }

});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(33)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(34),
  /* template */
  __webpack_require__(35),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-46a25268",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__env__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(0);
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AppNav',
  data() {
    return {
      email: "",
      password: "",
      user: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].user,
      home: true
    };
  },
  created() {
    var self = this;

    if (this.$route.path === '/') {
      this.home = true;
    } else {
      this.home = false;
    }
    __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].checkAuth();
  },
  methods: {},
  updated() {
    if (this.$route.path === '/') {
      this.home = true;
    } else {
      this.home = false;
    }
  }

});

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "AppNav",
    staticStyle: {
      "text-align": "center",
      "height": "100%"
    }
  }, [_c('h1', [_vm._v("University ID")])])
}]}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(37)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(39),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1a30c882",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AppFooter',
  data() {
    return {};
  },

  created() {
    var self = this;
  },

  methods: {}

});

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "AppFooter",
    staticStyle: {
      "text-align": "center",
      "position": "fixed",
      "width": "100%",
      "bottom": "0"
    }
  }, [_c('h3', {
    staticStyle: {
      "display": "table",
      "margin": "0 auto"
    }
  }, [_vm._v("Copyright © 2018 GUC. All Rights Reserved.")])])
}]}

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "height": "100%"
    },
    attrs: {
      "id": "app"
    }
  }, [(this.home) ? _c('AppNav') : _vm._e(), _vm._v(" "), _c('router-view'), _vm._v(" "), _c('AppFooter')], 1)
},staticRenderFns: []}

/***/ })
],[5]);
//# sourceMappingURL=app.970218d7345326329311.js.map