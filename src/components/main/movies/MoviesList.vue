<script>
import SingleMovie from './SingleMovie.vue';

export default {
    components:{
        SingleMovie,
    },

    name: 'MoviesList'
}
</script>

<template>
    <div>
        <h2>Test Movies List</h2>
        <SingleMovie/>
    </div>
    
</template>

<style lang="scss" scoped>
    div{
        background-color: blue;
    }

</style>