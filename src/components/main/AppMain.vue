<script>
import MovieList from './movies/MoviesList.vue'

export default {
    components:{
        MovieList,
    },

    name: 'AppMain'
}
</script>

<template>
    <div class="main-container">
        <h2>Test Main</h2>
        <MovieList/>
    </div>
</template>

<style lang="scss" scoped>
.main-container{
    background-color: gray;
    height: 400px;
}

</style>