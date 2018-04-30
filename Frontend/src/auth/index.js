import router from '../router'

const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'authenticate/'
// const SIGNUP_URL = API_URL + 'users/'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  login(data) {
    localStorage.setItem('token', data.token)

    localStorage.setItem('admin', data.admin)

    this.user.authenticated = true
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('token')

    localStorage.removeItem('admin')

    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'jwt-token': localStorage.getItem('token')
    }
  },
  getAdmin() {
    return JSON.parse(localStorage.getItem('admin'))
  },
  getAdminType() {
    return JSON.parse(localStorage.getItem('admin')).isSuper
  }

}
