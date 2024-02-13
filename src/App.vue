<script>
  import AppHeader from './components/header/AppHeader.vue'
  import AppMain from './components/main/AppMain.vue'

  export default{
    components:{
      AppHeader,
      AppMain,
    }
  }

</script>



<template>
 <!-- header containing logo and searchbar + btn -->
  <AppHeader/>

  <main>
    <!-- App Main contains: The movie list which will be the container of all films, displayed by importing the component Single Film inside of him -->
    <AppMain/>
  </main>

</template>



<style lang="scss">
@use './assets/style/general'

</style>
