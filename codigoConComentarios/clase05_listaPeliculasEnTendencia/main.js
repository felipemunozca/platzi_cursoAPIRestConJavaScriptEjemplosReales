/**
 * N5.1: Lo primero sera crear una función asíncrona para poder obtener las películas en tendencia, siguiendo la documentación oficial:
 * https://developer.themoviedb.org/reference/trending-movies
 * En la ventana de {time_window} podemos elegir day o week.
 * Luego se le debe concatenar la API Key y el resultado guardarlo en una constante data.
 */

async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();
    console.log(data)

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