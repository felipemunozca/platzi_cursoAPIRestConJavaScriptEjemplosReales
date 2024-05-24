const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
        'language': 'es',
    }
});

// Utils

function createMovies(movies, container) {
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories, container) {
    container.innerHTML = "";

    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

// Llamados a la API

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList)  ;
}

async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;

    createMovies(movies, genericSection);
}

/**
 * N13.3: Se reutiliza el código de la función getMoviesByCategory() pero en vez de recibir un "id", ahora recibirá una "query". 
 * Luego se debe apuntar al endpoint "/3/search/movie" como aparece en la documentación oficial:
 * https://developer.themoviedb.org/reference/search-movie
 * Se le debe pasar un query como parámetro y la respuesta de la búsqueda puede ser cero, uno o muchos títulos con el mismo nombre.
 * Si el nombre del parámetro fuera otro, por ejemplo "searchValue" se debería escribir en params query: search pero dado que ambos 
 *      valores tienen el mismo nombre de query, el compilador entiende que es una referencia de si mismo y solo se debe escribir 
 *      una vez.
 */
async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            // query: searchValue, //si el valor del parámetro fuera otro, se debería agregar asi. 
            query,
        },
    });
    const movies = data.results;
    
    createMovies(movies, genericSection);
}