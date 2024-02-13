<script>
import { store } from '@/store';

export default {
    name: 'AppHeader',
    

    data() {
        return {
            store,
        }
    },
}
</script>

<template>
    <header>
        <div class="flex-header">
            <h1>Boolflix</h1>
    
            <div>
                <input type="text" name="searchbar" id="searchbar" placeholder="Inserisci il nome del film..." v-model="store.movieSearchText" @keydown.enter="$emit('search')">
                <button type="button" @click.prevent="$emit('search')">Send</button>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../../assets/style/partials/mixins' as *;
@use '../../assets/style/partials/variables' as *;

header{
    background-color: rgb(38, 38, 38);
    div.flex-header{
        padding: 15px 0;
        @include container-lg;
        @include total-flex;
        h1{
            color: $red;
            font-weight: 400;
        }
        > div{
            display: flex;
            column-gap: 10px;
            input{
                padding: 10px 20px 10px 5px;
                border-radius: 5px;
                border: none;
                &:focus-visible{
                    outline: none;
                }
            }
            button{
                text-transform: capitalize;
                background-color: $red;
                font-weight: bold;
                border: none;
                border-radius: 5px;
                padding: 10px;
                &:hover{
                    cursor: pointer;
                }
                &:active{
                    background-color: lightcoral;
                }
            }
        }
    }
}

</style>