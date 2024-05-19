/**
 * N8.7: Se crea un evento que se lanzara al momento de cargar el contenido de la pagina.
 */
window.addEventListener('DOMContentLoaded', navigator, false);

/**
 * N8.5: hashchange es un evento que nos permite ejecutar cierto código cada vez que el hash cambie.
 * Documentación oficial:
 * https://developer.mozilla.org/es/docs/Web/API/Window/hashchange_event
 * 
 * N8.6: Se crea un evento que se activara al cargar la aplicación en window o en la ventana del navegador.
 * Se le asigna el evento, el nombre de la función y un tercer valor que sera false.
 * El valor de false se conoce como "useCapture" (que es un valor opcional). Si el valor fuera true, useCapture indica que el usuario 
 *      desea iniciar la captura. Después de iniciar la captura, todos los eventos del tipo especificado serán lanzados al listener 
 *      registrado antes de comenzar a ser controlados por algún EventTarget que esté por debajo en el árbol DOM del documento.
 */
window.addEventListener('hashchange', navigator, false);

/**
 * N8.2: Se crea una nueva función donde se podrá navegar dentro del archivo index.
 * Se obtendrán los valores del hash (#) que estarán definidos dentro del html y que aparecerán al momento de hacer clic sobre un 
 *      botón o enlace, cambiando el hash y asi cambiando las vistas en pantalla.
 * 
 * N8.3: Location es una propiedad de JavaScript en el navegador en la que podemos leer la URL en la que estamos parados.
 * Documentación oficial:
 * https://developer.mozilla.org/en-US/docs/Web/API/Location
 * 
 */
function navigator() {
    console.log({ location });
    /**
     * N8.4: Dentro de la función para navegar, se crearan varias condiciones para validar los hash.
     * Se utilizan las propiedades location.hash y el método startsWith() para buscar la palabra clave.
     */
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }

}

/**
 * N8.8: Para limpiar la función navigator() y no hacer los cambios en la vista del index.html se crearan funciones por separado
 *      para cada hash.
 */
function homePage() {
    console.log('Home!!');

    /**
     * N8.10: Se levantan las funciones para cargar la información de la API en el html desde cada hash correspondiente.
     */
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    console.log('categories!!');
}

function movieDetailsPage() {
    console.log('Movie!!');
}

function searchPage() {
    console.log('Search!!');
}

function trendsPage() {
    console.log('TRENDS!!');
}