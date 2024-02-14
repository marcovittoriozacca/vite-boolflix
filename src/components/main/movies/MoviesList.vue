<script>
import { store } from '@/store';
import SingleMovie from './SingleMovie.vue';
import ApiLoader from '../ApiLoader.vue';

export default {
    components:{
    SingleMovie,
    ApiLoader,
    ApiLoader
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
    <!-- se non ci sono elementi corrispondenti alla nostra ricerca -->

    <div v-if="!store.match" class="no-match">
        Non è stato trovato nessun risultato 🧐
    </div>

    <div v-else class="container">

        <ApiLoader v-if="store.loading"/>

        <div v-else>

            <div class="row-container" v-if="store.movies.length != 0 " >

                <h2>Film:</h2>

                <div class="movies-container">

                    <SingleMovie
                       v-for="(element, index) in store.movies" :key="index" 
                       :title="(element.title? element.title : element.name )"
                       :originalTitle="(element.original_title? element.original_title : element.original_name )"
                       :lang="element.original_language"
                       :rating="element.vote_average"
                       :image="element.poster_path"
                       :description="element.overview"
                       :id="element.id"
                       :genreObj="element.genre_ids" />

                </div>
            </div>

            <div class="row-container" v-if="store.series.length != 0 ">
            
                <h2>Serie Tv:</h2>
            
                <div class="movies-container">

                    <SingleMovie
                       v-for="(element, index) in store.series" :key="index" 
                       :title="(element.title? element.title : element.name )"
                       :originalTitle="(element.original_title? element.original_title : element.original_name )"
                       :lang="element.original_language"
                       :rating="element.vote_average"
                       :image="element.poster_path"
                       :description="element.overview"
                       :id="element.id"
                       :is-series = true
                       :genreObj="element.genre_ids" />
                </div>
            </div>


        </div>
    </div>
    
</template>

<style lang="scss" scoped>
@use '../../../assets/style/partials/mixins' as *;

.row-container{
    position: relative;
    padding-inline: 30px;
    margin-bottom: 40px;

    h2{
        font-size: 1.7rem;
        margin-bottom: 10px;
        color: white;
    }
    i{
        position: absolute;
        background-color: rgba(255, 255, 255, 1);
        font-size: 1.5rem;
        padding: 5px 10px;
        border-radius: 50%;
        z-index: 2;
        top:50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    .fa-angle-right{

        right: 45px;
    }
    .fa-angle-left{
        left: 45px;
    }
}
.movies-container{
    display: flex;
    gap: 10px;
    overflow-x: scroll;
    // @include no-scrollbar;

}
.no-match{
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    margin-top: 50px;
    color: white;
    
}
.loading-state{
    font-size: 2rem;
    background-color: black;
    color: white;
}

</style>