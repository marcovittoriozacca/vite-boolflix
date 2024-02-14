<script>
import { store } from '@/store';

export default {
    name: 'AppHeader',
    

    data() {
        return {
            store,
            navLink: [
                {
                    name: 'Home',
                    url: '#',
                    active: true,
                },
                {
                    name: 'Serie TV',
                    url: '#',
                    active: false,
                },
                {
                    name: 'Film',
                    url: '#',
                    active: false,
                },
                {
                    name: 'Originali',
                    url: '#',
                    active: false,
                },
                {
                    name: 'Aggiunti di recente',
                    url: '#',
                    active: false,
                },
                {
                    name: 'La mia lista',
                    url: '#',
                    active: false,
                },
        ]
        }
    },
    methods: {
        makeActive(index){
            this.navLink.forEach(element => {
                element.active = false
            });
            this.navLink[index].active = true;
        }
    },
}
</script>

<template>
    <header>
        <div class="flex-header">
            <ul>
                <li>
                    <h1>Boolflix</h1>
                </li>
                <li v-for="(links, index) in navLink" :key="index" :class="links.active? 'active' : '' " @click="makeActive(index)">
                    <a :href="links.url">
                        {{ links.name }}
                    </a>
                </li>
            </ul>
    
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
    background-color: black;
    div.flex-header{
        padding: 15px 0;
        @include container-lg;
        @include total-flex;
        ul{
            display: flex;
            align-items: center;
            column-gap: 20px;
            li{
                a{
                    &:hover{
                        color: $red;
                        position: relative;
                        &::before{
                            @include nav-red-bar;
                        }
                    }
                }
                h1{
                    color: $red;
                    font-weight: 400;
                }
            }
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



.active{
    a{
        color: $red;
        position: relative;
        &::before{
            @include nav-red-bar;
        }
    }
}

</style>