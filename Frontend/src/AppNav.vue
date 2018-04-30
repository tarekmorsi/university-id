<template>
<div class="AppNav" style="text-align: center; height:100%">
  <h1>University ID</h1>
</div>
</template>

<script>
import env from './env'
import auth from './auth'
import router from './router'
export default {
  name: 'AppNav',
  data() {
    return {
      email: "",
      password: "",
      user: auth.user,
      home: true
    }
  },
  created() {
    var self = this;

    if (this.$route.path === '/') {
      this.home = true
    } else {
      this.home = false
    }
    auth.checkAuth();
  },
  methods: {

  },
  updated() {
    if (this.$route.path === '/') {
      this.home = true
    } else {
      this.home = false
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.slide1:before{
    background: url(/static/images/slider/slide1.webp) center center;
}

.slide2:before{
    background: url(/static/images/slider/slide2.webp) center center;
}

.slide3:before{
    background: url(/static/images/slider/slide3.webp) center center;
}

</style>
