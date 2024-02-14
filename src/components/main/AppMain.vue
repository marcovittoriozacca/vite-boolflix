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
    background-color: rgb(35, 33, 33);
    height: calc( 100lvh - 66px );
    overflow-y: auto;
    padding: 25px 0;
}

</style>