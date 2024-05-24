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
    // console.log(data)
    
    const movies = data.results;
    // console.log(movies);

    /*
     * N10.1: Se agrega la propiedad innerHTML igual a vació, para limpiar la vista antes de agregar el código html.
     * De esta forma se evita duplicar las películas en tendencia. 
     * Ya que se creo un archivo nodes.js para gestionar todos los archivos llamados desde index.html, no es necesario volver a 
     *      declararlo solo se llama, ademas se puede comentar el llamado de dicho constante en la primera linea del forEach.
     * Se cambia el nombre de la constante por uno que sea mas descriptivo utilizando la ideología de BEM.
     */
    trendingMoviesPreviewList.innerHTML = "";
    
    movies.forEach(movie => {
        // const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');

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
    
    /*
     * N10.2: Se limpia la vista antes de cargar los elementos en el HTML y asi evitar etiquetas duplicadas.
     * Se cambia el nombre de la constante por uno mas descriptivo.
     */
    categoriesPreviewList.innerHTML = "";

    categories.forEach(category => {
        // const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
        
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
    
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
                                // ('id', 'id' + category.id)
        categoryTitle.setAttribute('id',`id${category.id}`);
        const categoryTitleText = document.createTextNode(category.name);
    
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        // previewCategoriesContainer.appendChild(categoryContainer);
        categoriesPreviewList.appendChild(categoryContainer);
    });
}