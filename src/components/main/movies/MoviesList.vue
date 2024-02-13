<script>
import { store } from '@/store';
import SingleMovie from './SingleMovie.vue';

export default {
    components:{
        SingleMovie,
    },

    name: 'MoviesList',

    data() {
        return {
            store,
        }
    },
}
</script>

<template>
    <div class="movies-container">
        <SingleMovie
           v-for="(movie, index) in store.movies" :key="index" 
           :title="movie.title"
           :originalTitle="movie.original_title"
           :lang="movie.original_language"
           :rating="movie.vote_average" />
    </div>
    
</template>

<style lang="scss" scoped>
.movies-container{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

</style>