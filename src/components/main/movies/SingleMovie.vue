<script>
export default {
    name: 'SingleMovie',
    props:{
        title: String,
        originalTitle: String,
        lang: String,
        rating: Number,
    },

    data() {
        return {
            
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
        }
    },
}
</script>

<template>
    <div>
        <h2>{{ title }}</h2>
        <h2>{{ originalTitle }}</h2>
        <img :src="`https://flagcdn.com/w40/${ flag(lang)}.png`" :alt="lang"> 
        
        <span>{{ rating }}</span>
    </div>
</template>

<style lang="scss" scoped>

    div{
        border: 1px solid black;
        padding: 20px;
    }

</style>