<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
   <button  @click="goToDaybook" class="btn btn-primary">Primary</button>
    <button class="btn btn-secondary">Primary</button>
     <button class="btn btn-success">Primary</button>
  </div>
</template>
<script>
export default {
  methods:{
    goToDaybook(){
      this.$router.push({name:'no-entry'})
    }
  }
}
</script>