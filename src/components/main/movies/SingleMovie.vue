<script>
export default {
    name: 'SingleMovie',
    props:{
        title: String,
        originalTitle: String,
        lang: String,
        rating: Number,
    }
}
</script>

<template>
    <div>
        <h2>Title: {{ title }}</h2>
        <h2>Original Title: {{ originalTitle }}</h2>
        <h5>Language: {{ lang }}</h5>
        <span>Rating: {{ rating }}</span>
    </div>
</template>

<style lang="scss" scoped>

    div{
        border: 1px solid black;
        padding: 20px;
    }

</style>