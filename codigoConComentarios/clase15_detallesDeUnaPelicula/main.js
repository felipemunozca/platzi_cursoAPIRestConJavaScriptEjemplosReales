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

        /**
         * N15.1: Se crea un evento click para cada contenedor con la caratula de las películas.
         * Cuando el usuario haga click sobre una imagen, se cambiara el valor del hash agregando la ruta #movie mas el id de cada
         *      película.
         */
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });

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

async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        },
    });
    const movies = data.results;
    
    createMovies(movies, genericSection);
}

async function getTrendingMovies() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    createMovies(movies, genericSection);
}

/**
 * N15.3: Se crea la función para obtener la información de UNA película según su id.
 * Se debe apuntar al endpoint ".../3/movie/movie_id" como aparece en la documentación oficial:
 * https://developer.themoviedb.org/reference/movie-details
 * 
 * N15.4: Se recibirá el objeto "data" y no es necesario crear una nueva constante "movie" como en los ejercicios anteriores
 *      ya que solo sera una película y no un arreglo de datos. Asi que se puede renombrar directamente el valor de data utilizando
 *      dos puntos y su nuevo nombre que sera "movie".
 * 
 * Se agrega el titulo de la película llamando al valor title.
 * Se agrega la descripción de la película llamando al valor overview.
 * Se agrega la calificación (estrellas) de la película llamando al valor vote_average.
 * 
 * N15.6: Se deben agregar los géneros a los que pertenece la película. Para este reutilizamos la función createCategories()
 *      y se le pasan como valores, "genres" que viene en el llamado de la API y el nombre de la etiqueta donde se debe imprimir
 *      esta información.
 * 
 * N15.7: El ultimo paso que estaría faltando, es agregar el poster de la película como fondo de la etiqueta <header>.
 * Se obtiene la imagen siguiendo el endpoint que se utilizo para imprimir las tarjetas con los poster, el único cambio fue cambiar
 *      el tamaño del width de w300 a w500. Se le concatena el valor del obtenido y su propiedad poster_path.
 * Se llama a la variable "headerSection" y mediante style.background se define que la url de la imagen sera la constante recién
 *      creada. Para evitar que los posters con fondos blancos borren la flecha para volver, se le puede agregar una gradiente a la
 *      imagen para que la parte superior se vea un poco mas oscuro, tal cual como la que esta en el archivo app.css en la 
 *      clase .header-container--long
 */
async function getMovieById(id) {
    const { data: movie } = await api('movie/' + id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    // console.log(movieImgUrl)
    headerSection.style.background = `
        linear-gradient(
            180deg, 
            rgba(0, 0, 0, 0.35) 19.27%, 
            rgba(0, 0, 0, 0) 29.17%
        ),
        url(${movieImgUrl})
    `;
    
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
    
    createCategories(movie.genres, movieDetailCategoriesList);
}