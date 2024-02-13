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
      async getMovies(){
        await axios.get(`${store.movieAPIurl}?api_key=${store.API_KEY}&query=${store.movieSearchText}`)
          .then( (res) => {
            store.movies = res.data.results;

          })
      },
      async getSeries(){
        await axios.get(`${store.tvSeriesAPIurl}?api_key=${store.API_KEY}&query=${store.movieSearchText}`)
          .then( (res) => {
            store.series = res.data.results;

          })
      },

      async getAll(){
        store.loading = true,
        await  this.getMovies();
        await  this.getSeries();
        store.all = store.series.concat(store.movies)
        store.loading = false  
      }
    },


  }


</script>



<template>
 <!-- header containing logo and searchbar + btn -->
  <AppHeader @search="getAll"/>

  <main>
    <!-- App Main contains: The movie list which will be the container of all films, displayed by importing the component Single Film inside of him -->
    <AppMain/>
  </main>

</template>



<style lang="scss">
@use './assets/style/general'

</style>
