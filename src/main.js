/**
 * N5.1: Lo primero sera crear una función asíncrona para poder obtener las películas en tendencia, siguiendo la documentación oficial:
 * https://developer.themoviedb.org/reference/trending-movies
 * En la ventana de {time_window} podemos elegir day o week.
 * Luego se le debe concatenar la API Key y el resultado guardarlo en una constante data.
 * 
 * N6.1: Se agrega la propiedad language al final de la url de la api para poder obtener la información en español.
 */
async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY + '&language=es');
    const data = await res.json();
    console.log(data)
    
    const movies = data.results;
    // console.log(movies);

    /**
     * N5.3: Se utiliza un forEach() para recorrer la data y asi obtener los valores de las películas por separado.
     * Utilizando el método createElement() se comenzara a crear las tarjetas con los valores que se reciben desde la API y asi poder
     *      imprimirlos en el index.html.
     * Se crea una constante para buscar la etiqueta que se llame "trendingPreview" y ademas, tenga la clase "trendingPreview-movieList".
     * Se crea una etiqueta <div>, donde se agregaran las imágenes, ademas contara con su propia clase.
     * Se crea una etiqueta <img>, se le asigna una clase y luego sus atributos mediante el método setAttribute(). El primer valor sera
     *      el alt al cual se le asignara el nombre de la película. El segundo sera la ruta o src de la imagen, la cual estará compuesta
     *      por la URL de la API, se le agrega un width de 300 y se le concatena el valor de poster_path.
     * Finalmente, se agregan las etiquetas hijas dentro de las etiquetas padres utilizando appendChild().
     */
    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
}

/**
 * N6.2: Se crea una función para obtener la lista de categorías o géneros de películas, siguiendo el ejemplo en la documentación oficial:
 * https://developer.themoviedb.org/reference/genre-movie-list
 * 
 */
async function getCategoriesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY + '&language=es');
    const data = await res.json();
    
    /**
     * N6.3: Se crea una constante para almacenar el arreglo con los géneros que se reciben desde la API.
     * Luego se utilizar aun forEach() para recorrer dicho arreglo.
     */
    const categories = data.genres;

    categories.forEach(category => {
        /**
         * N6.4: Se obtiene el contenedor donde se agregara el listado de categorías (géneros) utilizando un query selector.
         * Se crea una etiqueta <div> junto a su clase.
         * Se crea una etiqueta <h3> donde se asignara el titulo de cada categoría (genero). Al titulo se le agrega el atributo id
         *      para poder asignarle un color a diferente a cada categoría (cada id esta definido en el archivo styles.css)
         * Se obtiene el "name" de cada categoría y se agrega al h3 mediante el método createTextNode().
         * Finalmente, se crea la estructura para imprimirla en html utilizando el método appendChild() de adentro hacia afuera.
         */
        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
        
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
    
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
                                /* ('id', 'id' + category.id) */
        categoryTitle.setAttribute('id',`id${category.id}`);
        const categoryTitleText = document.createTextNode(category.name);
    
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        previewCategoriesContainer.appendChild(categoryContainer);
    });
}

getTrendingMoviesPreview();
getCategoriesPreview();