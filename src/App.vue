<script>
  import { store } from './store'

  import axios from 'axios'
  import AppHeader from './components/header/AppHeader.vue'
  import AppMain from './components/main/AppMain.vue'

  export default{
    components:{
      AppHeader,
      AppMain,
    },

    data() {
      return {
        store,
      }
    },
    methods: {
      test(){
        axios.get(`${store.movieAPIurl}?api_key=${store.API_KEY}&query=${store.movieSearchText}`)
          .then( (res) => {
            store.movies = res.data.results;
          })
      }
    },


  }


</script>



<template>
 <!-- header containing logo and searchbar + btn -->
  <AppHeader @search="test"/>

  <main>
    <!-- App Main contains: The movie list which will be the container of all films, displayed by importing the component Single Film inside of him -->
    <AppMain/>
  </main>

</template>



<style lang="scss">
@use './assets/style/general'

</style>
