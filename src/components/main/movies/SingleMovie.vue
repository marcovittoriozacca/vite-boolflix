<script>
import axios from 'axios';
import { store } from '@/store';
export default {
    name: 'SingleMovie',
    props:{
        title: String,
        originalTitle: String,
        lang: String,
        rating: Number,
        image: String,
        description: String,
        id: Number,
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
            axios.get(`https://api.themoviedb.org/3/${endpoint}/${this.id}/credits?api_key=${store.API_KEY}`)
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
        }


    },
    created() {
        this.getActors()
        
    },
    mounted(){
        
        this.getGenre()
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

    <div class="element-container" @mouseenter="hoverEffect"
        :class="hover? 'activeHover' : '' ">
        <figure class="element-image">
            <img v-if="image" :src="`https://image.tmdb.org/t/p/w500/${image}`" :alt="title">
            <p class="missing-img" v-else> 🧐 <br>No image </p>
        </figure>
        <div class="info-container">
            <div class="info">
                <div v-if="title != originalTitle">
                    <p><span>Titolo:</span> {{ title }}</p>
                    <p><span>Titolo originale:</span> {{ originalTitle }}</p>
                </div>
                <div v-else>
                    <p><span>Titolo: {{ title }}</span></p>
                </div>
                <figure class="language">
                    <span>Lingua: </span>
                    <img :src="`https://flagcdn.com/w40/${ flag(lang)}.png`" :alt="lang">
                </figure>
                <div v-if="rating!= 0" class="stars">
                    <span>Voto: </span>
                    <span v-for="(star, index) in 5" :key="index">
                        <i class="fa-solid fa-star" :style="(index < stars(rating)? 'color: #FFD43B' : '' )"></i>
                    </span>
                </div>
                <span v-else>
                    No rating available yet...
                </span>
                <p v-if="description"><span>Overview:</span> {{ description }}</p>
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
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../../assets/style/partials/mixins' as *;
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