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

async function getTrendingMoviesPreview() {
    // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY + '&language=es');
    // const data = await res.json();
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    trendingMoviesPreviewList.innerHTML = "";

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        // trendingPreviewMoviesContainer.appendChild(movieContainer);
        trendingMoviesPreviewList.appendChild(movieContainer);
    });
}

async function getCategoriesPreview() {
    // const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY + '&language=es');
    // const data = await res.json();
    const { data } = await api('genre/movie/list')
    const categories = data.genres;

    categoriesPreviewList.innerHTML = "";

    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
    
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
                                /* ('id', 'id' + category.id) */
        categoryTitle.setAttribute('id',`id${category.id}`);

        /**
         * N11.1: Se crea un evento clic que se agregara en cada titulo de categoría.
         * Cada vez que se haga un clic sobre un titulo, se cambiara el hash, y se le agregara información extra, se le asignara 
         *      el id (para consideración del programador) y el nombre (para consideración del usuario).
         * El formato que se envía al location seria por ejemplo: #category=12-Aventura
         */
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });

        const categoryTitleText = document.createTextNode(category.name);
    
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        // previewCategoriesContainer.appendChild(categoryContainer);
        categoriesPreviewList.appendChild(categoryContainer);
    });
}

/**
 * N11.2: Se crea una nueva función para llamar a las películas por categorías.
 * Para poder solo las películas de cierto genero, se pueden seguir los pasos que se muestran en la documentación oficial:
 * https://developer.themoviedb.org/reference/discover-movie
 * 
 * El endpoint sera "discover/movie" y MUY IMPORTANTE se debe pasar el id (que se recibirá al ejecutar la función) de cada 
 *      categoría como parámetro como un query parameter llamado "with_genres".
 */
async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;

    genericSection.innerHTML = "";
    
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        genericSection.appendChild(movieContainer);
    });
}