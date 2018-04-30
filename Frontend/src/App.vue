<template>
<div id="app" style="height:100%;">
  <AppNav v-if="this.home"></AppNav>
  <router-view></router-view>
  <AppFooter></AppFooter>
</div>
</template>

<script>
import AppNav from './AppNav.vue'
import AppFooter from './AppFooter.vue'
import router from './router'

export default {
  name: 'app',
  components: {
    AppNav,
    AppFooter,
  },

  created: function() {
    var self = this;
    // self.initSlick();
  },

  methods: {
  },

  data() {
    return {
      admin: false,
      home:true

    }
  },
  updated() {

    if (this.$route.path === '/admin') {
      this.admin = true
    } else if (this.$route.path === '/') {
      this.admin = false
      this.home = true
    }else {
        this.home = false
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
