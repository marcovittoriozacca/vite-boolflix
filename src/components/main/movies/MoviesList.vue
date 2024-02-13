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
    <div class="container">
        <div v-if="store.loading" class="loading-state">
            Loading...
        </div>
        <div v-else class="movies-container">
            <SingleMovie
               v-for="(element, index) in store.all" :key="index" 
               :title="(element.title? element.title : element.name )"
               :originalTitle="(element.original_title? element.original_title : element.original_name )"
               :lang="element.original_language"
               :rating="element.vote_average"
               :image="element.poster_path"
               :description="element.overview" />
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
@use '../../../assets/style/partials/mixins' as *;
.container{
    @include container-lg
}
.movies-container{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;


}

.loading-state{
    font-size: 2rem;
    background-color: black;
    color: white;
}

</style>