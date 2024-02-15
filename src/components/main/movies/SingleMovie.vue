<script>
import axios from 'axios';
import { store } from '@/store';
export default {
    name: 'SingleMovie',
    props:{
        propElement: Object,
        genreObj: Array,
        isSeries: Boolean
    },

    data() {
        return {
            starsNumber: 0,
            hover: false,
            store,
            actor:[],
            matchGenres: [],
            trailerUrl: '',

        }
    },
    methods: {
        flag(lang){
            switch (lang){
                case 'en':
                    return 'gb';
                case 'hi':
                    return 'in';
                case 'he':
                    return 'il';
                case 'zh':
                    return 'cn';
                case 'ko':
                    return 'kr';
                case 'ja':
                    return 'jp';
                case 'da':
                    return 'dk';
                case 'ta':
                    return 'in';
                case 'fa':
                    return 'ir';
                case 'cs':
                    return 'cz';
                case 'jv':
                    return 'id';
                default: return lang;
            }
        },
        stars(rating){
            let variable = rating;
            if(variable !== 0){
                return Math.round( variable / 2 )
            }
        },
        hoverEffect(){
                const interval = setInterval(() => {
                    this.hover = true
                    clearInterval(interval)
                }, 500);
                this.hover = false
            
        },
        getActors(){
            let endpoint;

            if(this.isSeries){
                endpoint = 'tv'
            }else{
                endpoint = 'movie'
            }
            axios.get(`https://api.themoviedb.org/3/${endpoint}/${this.propElement.id}/credits?api_key=${store.API_KEY}`)
            .then((res) => {
                this.actor = res.data.cast
                if(this.actor.length > 5){
                    this.actor = this.actor.slice(0, 5)
                }
                return this.actor
        }).catch((err) => err.response.status = null)
        },

        getGenre(){
            this.matchGenres = new Set()

            if(!this.isSeries){
                this.genreObj.forEach(element => {
                    store.filmGenre.forEach(el => {
                        if(el.id == element){
                            this.matchGenres.add(el.name)
                        }
                    }); 
                });
            }else{
                this.genreObj.forEach(element => {
                    store.seriesGenre.forEach(el => {
                        if(el.id == element){
                            this.matchGenres.add(el.name)
                        }
                    }); 
                });
            }
            this.matchGenres = Array.from(this.matchGenres);
        },
        // get movie trailer, for now its just a random video
        async getVideos(){
            let endpoint

            if(this.isSeries){
               endpoint = 'tv' 
            }else{
                endpoint = 'movie'
            }
            await axios.get(`https://api.themoviedb.org/3/${endpoint}/${this.propElement.id}/videos?api_key=${store.API_KEY}`)
            .then((res) => {
                if(res.data.results.length > 0){
                    this.trailerUrl = res.data.results[0].key
                }
            })
        }


    },
    created() {
        this.getActors()
    },
    mounted(){
        this.getGenre()
        this.getVideos()
    },
    computed:{
        embedUrl() {
        return 'https://www.youtube.com/embed/' + this.trailerUrl;
    }
    },
    watch:{
        'store.filmGenre':{
            handler: function(){
                this.getGenre()
            }
        },
        'store.seriesGenre':{
            handler: function(){
                this.getGenre()
            }
        }
    }
}

</script>

<template>
    
    <div class="element-container" 
         @mouseenter="hoverEffect"
         :class="hover? 'activeHover' : '' ">    
    
        <figure class="element-image">
            <img v-if="propElement.poster_path" :src="`https://image.tmdb.org/t/p/w500/${propElement.poster_path}`" :alt="propElement.title? propElement.title : propElement.name">
            <p class="missing-img" v-else> 🧐 <br>No image </p>
        </figure>

        <div class="info-container">
            <div class="info">
                <div>
                    <p><span>Titolo:</span> {{ propElement.title? propElement.title : propElement.name }}</p>
                    <p><span>Titolo originale:</span> {{ propElement.original_title? propElement.original_title : propElement.original_name }}</p>
                </div>
                <figure class="language">
                    <span>Lingua: </span>
                    <img :src="`https://flagcdn.com/w40/${ flag(propElement.original_language)}.png`" :alt="propElement.original_language">
                </figure>
                <div v-if="propElement.vote_average!= 0" class="stars">
                    <span>Voto: </span>
                    <span v-for="(star, index) in 5" :key="index">
                        <i class="fa-solid fa-star" :style="(index < stars(propElement.vote_average)? 'color: #FFD43B' : '' )"></i>
                    </span>
                </div>
                <span v-else>
                    No rating available yet...
                </span>
                <p v-if="propElement.overview"><span>Overview:</span> {{ propElement.overview }}</p>
                <span v-else></span>
                <div class="actors">
                        <span>Attori: </span>
                        <p v-for="(actors, index) in actor" :key="index" v-if="actor.length != 0">
                            {{ actors.name }}
                        </p>
                        <p v-else>
                            No actors
                        </p>
                </div>
                <div class="geners">
                    <span>Generi: </span>
                    <p v-for="(genres, index) in matchGenres" :key="index">
                        {{ genres }}
                    </p>
                </div>
                <div class="trailer" v-if="trailerUrl != ''">
                    <button type="button">Clicca per vedere il trailer!</button>
                    <dialog open>
                        <iframe width="560" height="315" :src="embedUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </dialog>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
@use '../../../assets/style/partials/mixins' as *;
@use '../../../assets/style/partials/variables' as *;
.trailer{
    button{
        border: 1px solid white;
        border-radius: 4px;
        padding: 5px 10px;
        text-transform: uppercase;
        color: $red;
        background-color: black;
        cursor: pointer;
    }
    dialog{
        width: 100%;
        height: 100%;
    }
}
.activeHover{
    transition: .2s all ease-out;
        &:hover{
            width: 500px;
            .element-image img{
                opacity: 0;
            }
        }
        &:hover .info-container {
            display: block;
            cursor: pointer;
        }
}
    .element-container{
        background-color: black;
        position: relative;
        height: 400px;
        width: 300px;
        border-radius: 10px;
        flex: 0 0 auto;
        
        figure.element-image{
            height: 100%;
            border-radius: 10px;

            overflow: hidden;
            img{
                cursor: pointer;
                border-radius: 10px;
                height: 100%;
                min-width: 100%;
                transition: .2s all ease-in-out;
            }
        }
        .info-container{
            
            position: absolute;
            top: 0;
            @include full-ratio;
            overflow: auto;
            @include no-scrollbar;
            display: none;
            padding: 10px 5px;
                .info{
                display: flex;
                flex-direction: column;
                align-items: start;
                row-gap: 20px;
                
                color: white;
                padding: 10px;
                
                .language{
                    display: flex;
                    align-items: center;
                    column-gap: 10px;
                }
                p:last-child{
                    line-height: 150%;
                }
                span{
                    font-weight: bold;
                }
            }
        }
    }
    .missing-img{
        text-align: center;
        color: white;
        font-size: 3rem;
        @include center-flex;
        @include full-ratio;
        width: 266px;
        height: 400px;
        cursor: pointer;
        
    }

    .actors, .geners{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        p:not(p:last-child){
            &::after{
                content: ',';
            }
        }
    }

</style>