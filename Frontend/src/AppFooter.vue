<template>
<div class="AppFooter" style="text-align:center; position: fixed; width: 100%; bottom: 0;">
  <h3 style="display: table; margin: 0 auto;">Copyright © 2018 GUC. All Rights Reserved.</h3>
</div>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {}
  },

  created() {
    var self = this;
  },

  methods: {

}


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer1:before {
  background-position: center;
  background-image: url(/static/images/RapidoGee.jpg);
  background-size: cover;
  background-attachment: fixed;
}

.spotlight {
  background-attachment: fixed;
  background-size: cover;
  box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, .25);
  height: 30vh;
  position: relative;
}
</style>
