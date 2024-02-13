<script>
export default {
    name: 'SingleMovie',
    props:{
        title: String,
        originalTitle: String,
        lang: String,
        rating: Number,
        image: String,
        description: String,
    },

    data() {
        return {
            starsNumber: 0
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
        }
    },

}
</script>

<template>
    <div class="element-container">
        <figure class="element-image">
            <img v-if="image" :src="`https://image.tmdb.org/t/p/w342/${image}`" :alt="title">
            <p class="missing-img" v-else> 🧐 <br>No image </p>
        </figure>
        <div class="info-container">
            <div class="info">
                <p><span>Titolo:</span> {{ title }}</p>
                <p><span>Titolo originale:</span> {{ originalTitle }}</p>
                <figure class="language">
                    <span>Lingua: </span>
                    <img :src="`https://flagcdn.com/w40/${ flag(lang)}.png`" :alt="lang">
                </figure>
                <div v-if="rating!= 0" class="stars">
                    <span>Voto: </span>
                    <span v-for="star in stars(rating)">
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                    </span>
                </div>
                <span v-else>
                    No rating available yet...
                </span>
                <p v-if="description"><span>Overview:</span> {{ description }}</p>
                <span v-else></span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../../assets/style/partials/mixins' as *;

    .element-container{
        background-color: black;
        border: .5px solid lightgray;
        position: relative;
        width: calc( 100% / 5 - 8px );
        aspect-ratio: 1/1.5;
        
        &:hover .info-container {
            display: block;
            cursor: pointer;
        }
        &:hover figure.element-image{
            opacity: .1;
            cursor: pointer;
        }
        &:hover figure.element-image img{
            transform: scale(110%);
        }
        figure.element-image{
            @include full-ratio;
            overflow: hidden;
            img{
                @include full-ratio;
                transition: .3s all linear;
            }
        }
        .info-container{
            position: absolute;
            top: 0;
            @include full-ratio;
            overflow: auto;
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
        
    }

</style>