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

/**
 * N12.1: El código para imprimir la lista de películas en tendencia y la lista de películas por genero es exactamente el mismo, solo 
 *      cambia el endpoint de la API y el contenedor donde se imprimirá todo, por lo que siguiendo el principio de DRY o 
 *      Don´t Repeat Yourself lo mejor es crear una nueva función que pueda hacer ambos códigos recibiendo como parámetros los valores
 *      a cambiar, esto le dará mejor rendimiento y lectura a nuestro a código.
 */

/**
 * N12.2: Se crea una nueva función para crear una sección del index que sera REUTILIZABLE.
 * Recibirá como parámetros un arreglo con "movies" y el nombre del "container" donde se debe insertar.
 * El resto de la función sera el mismo que creamos en las clases anteriores:
 * Se limpia el contenido cada vez que se ejecute la función y luego se entra al arreglo "movies" para recorrerlo e imprimir las 
 *      tarjetas con los posters de cada película. Finalmente se imprime con appendChild el contenido creado en el "container" 
 *      que se envié como parámetro. 
 */
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

/**
 * N12.4: Se crea una nueva función para crear una sección para obtener las categorías que sera REUTILIZABLE.
 * Recibirá como parámetros un arreglo con "categories" y el nombre del "container" donde se debe insertar.
 * Se limpia el contenido cada vez que se ejecute la función y luego se entra al arreglo "categories" para recorrerlo e imprimir 
 *      la lista de categorías (géneros). Finalmente se imprime con appendChild el contenido creado en el "container" que se 
 *      envié como parámetro. 
 */
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

/**
 * N12.3: Se borra el contenido que tenia anteriormente la función para obtener las películas en tendencia y utilizando la plantilla
 *      createMovies() a la que se le pasan como argumentos: 
 *      - El arreglo "movies" que obtiene la información de la API.
 *      - El nombre del "container" que esta definido en el archivo nodes.js.
 */
async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList);
}

/**
 * N12.5: Se borra el contenido que tenia anteriormente la función para obtener las categorías de películas y utilizando la
 *      plantilla createCategories() a la que se le pasan los siguientes argumentos:
 *      - El arreglo "categories" que obtiene la información de la API.
 *      - El nombre del "container" que se obtiene desde el archivo nodes.js.
 */
async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList)  ;
}

/**
 * N12.7: Se borra el contenido que tenia la función para obtener un listado de películas por categoría, solo se debe actualizar
 *      el código para poder reutilizar la función createMovies().
 */
async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;

    createMovies(movies, genericSection);
}