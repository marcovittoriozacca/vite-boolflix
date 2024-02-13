<script>
export default {
    name: 'SingleMovie',
    props:{
        title: String,
        originalTitle: String,
        lang: String,
        rating: Number,
        image: String,
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
        <h2>{{ title }}</h2>
        <h2>{{ originalTitle }}</h2>
        <img v-if="image" :src="`https://image.tmdb.org/t/p/w342/${image}`" alt="">
        <p class="missing-img" v-else>Foto mancancte</p>
        <img :src="`https://flagcdn.com/w40/${ flag(lang)}.png`" :alt="lang">
        <div v-if="rating!= 0" class="stars">
            <span v-for="star in stars(rating)">
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            </span>
        </div>
        <span v-else>
            No rating available yet...
        </span>
    </div>
</template>

<style lang="scss" scoped>

    .element-container{
        border: 1px solid black;
        padding: 20px;
    }
    .missing-img{
        background-color: red;
        text-align: center;
        height: 86%;
        padding-top: 100%;
    }
</style>