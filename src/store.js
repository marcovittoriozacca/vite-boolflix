import { reactive } from "vue";
export const store = reactive({
    API_KEY: 'd310a03c38e6724d794f826e8f368a0b',
    movieAPIurl: 'https://api.themoviedb.org/3/search/movie',
    tvSeriesAPIurl: 'https://api.themoviedb.org/3/search/tv',
    genreAPIurl: 'https://api.themoviedb.org/3/genre',
    movieSearchText: '',
    movies: [],
    series: [],
    all: [],

    seriesGenre: [],
    filmGenre: [],
    genres: [],


    loading: false,
    match: true,
})

