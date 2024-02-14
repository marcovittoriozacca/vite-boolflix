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
      //riempimento array dei film
      async getMovies(){
        await axios.get(`${store.movieAPIurl}?api_key=${store.API_KEY}&query=${store.movieSearchText}`)
          .then( (res) => {
            store.movies = res.data.results;
          })
      },
      //riempimento array delle serie tv
      async getSeries(){
        await axios.get(`${store.tvSeriesAPIurl}?api_key=${store.API_KEY}&query=${store.movieSearchText}`)
          .then( (res) => {
            store.series = res.data.results;

          })
      },
      //riempimento degli array dei generi
      async getMoviesGenres(){
        await axios.get(`${store.genreAPIurl}/movie/list?api_key=${store.API_KEY}`)
              .then( (res) => {

                store.filmGenre = res.data.genres
              })
      },
      async getSeriesGenres(){
        await axios.get(`${store.genreAPIurl}/tv/list?api_key=${store.API_KEY}`)
              .then( (res) => {
                store.seriesGenre = res.data.genres
              })
      },

      async getAll(){
        store.loading = true,
        await  this.getMovies();
        await  this.getSeries();
        store.all = store.series.concat(store.movies)
        
        store.loading = false;
      }


    },


    created() {
      axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=it-IT&page=1&sort_by=popularity.desc&api_key='+store.API_KEY).then((res) =>{
        store.movies = res.data.results;
      })
      axios.get('https://api.themoviedb.org/3/discover/tv?include_adult=true&include_video=false&language=it-IT&page=1&sort_by=popularity.desc&api_key='+store.API_KEY).then((res) =>{
        store.series = res.data.results;
      })

    },
    mounted(){
      
      this.getMoviesGenres();
      this.getSeriesGenres();
    }



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
