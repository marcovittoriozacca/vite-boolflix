<script>
export default {
    name: 'ApiLoader',
}
</script>

<template>
    <div class="loader-container">
        <div class="loader"></div>
    </div>

</template>

<style lang="scss" scoped>
@use '../../assets/style/partials/variables' as *;
@use '../../assets/style/partials/mixins' as *;
    .loader {
    width: 100px;
    padding: 15px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: $red;
    --_m: 
        conic-gradient(#0000 10%,#000),
        linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
            mask: var(--_m);
    -webkit-mask-composite: source-out;
            mask-composite: subtract;
    animation: l3 1s infinite linear;
    }
    @keyframes l3 {to{transform: rotate(1turn)}}

.loader-container{    
    @include center-flex;
    margin-top:50px;
}

</style>