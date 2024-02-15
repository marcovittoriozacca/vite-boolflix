<script>
import { store } from '@/store'
import axios from 'axios'
export default {
    name: 'TrailerComp',
    props:[
        'elementId',
        'isSeries',
        'isHovering',
    ],
    data() {
        return {
            trailerUrl: '',
            trailerFlag: false
        }
    },
    methods: {
        async getVideos(){
            let endpoint

            if(this.isSeries){
               endpoint = 'tv' 
            }else{
                endpoint = 'movie'
            }
            await axios.get(`https://api.themoviedb.org/3/${endpoint}/${this.elementId}/videos?api_key=${store.API_KEY}`)
            .then((res) => {
                if(res.data.results.length > 0){
                    this.trailerUrl = res.data.results[0].key
                }
            })
        },
    },
    mounted() {
        this.getVideos()
    },
    computed:{
        embedUrl() {
            console.clear()
            return 'https://www.youtube.com/embed/' + this.trailerUrl;
        },
    }

}
</script>

<template>

    <div class="trailer" v-if="trailerUrl != ''">
        <button @click="trailerFlag = !trailerFlag">Clicca per vedere il trailer!</button>
        <dialog :open="trailerFlag">
            <iframe v-if="trailerFlag && isHovering" :src="embedUrl" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
        </dialog>
    </div>

</template>


<style lang="scss" scoped>
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
        iframe{
            width: 100%;
            height: 100%;
        }
    }
}
    
</style>