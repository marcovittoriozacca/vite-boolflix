<script>
import MovieList from './movies/MoviesList.vue'
import { store } from '@/store';

export default {
    components:{
        MovieList,
    },

    name: 'AppMain',

    data(){
        return{
            store,
        }
    }
}
</script>

<template>
    <div class="main-container">
        <MovieList/>
    </div>
</template>

<style lang="scss" scoped>
.main-container{
    background-color: gray;
    height: calc( 100lvh - 66px );
    overflow: auto;
    padding: 25px 0;
}

</style>