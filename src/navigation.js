/**
 * N9.8: Se crean los eventos que escuchan hacer clic en los botones de la pagina.
 * De esta manera se cambia el hash y asi cambian las vistas.
 */
searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=';
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
    location.hash = '#home';
});


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
     * N9.3: Ya que tengo todas las variables definidas en nodes.js a continuación se crearan las situaciones en las que al presionar
     *      un hash, la vista de la pagina cambiara.
     * Para esto se estarán agregando y quitando clases dependiendo de cada elemento.
     * Al utilizar la propiedad style.background igual a vació, se entiende que se esta limpiando el background sacando cualquier
     *      imagen que pudiera tener.
     * La flecha para volver (arrowBtn) se dejara inactiva, es decir, oculta.
     * Se dejan activas (visibles) las secciones con remove: - tendencias - categorías
     * Se dejan inactivas (ocultas) las secciones con add: - lista genérica - detalles de películas
     */
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';  //Limpiar el background
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    /**
     * N8.10: Se levantan las funciones para cargar la información de la API en el html desde cada hash correspondiente.
     */
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    console.log('categories!!');

    /**
     * N9.4: Cuando se presione el hash #category= se realizaran los siguientes cambios:
     * La flecha para volver se le quitara la clase inactive (sera visible).
     * El titulo principal se ocultara y el titulo de la categoría se hará visible.
     * El formulario de búsqueda se ocultara.
     * Se dejan activas (visibles) las secciones con remove: - lista genérica 
     * Se dejan inactivas (ocultas) las secciones con add: - tendencias - categorías - detalles de películas
     */
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}

function movieDetailsPage() {
    console.log('Movie!!');

    /**
     * N9.5: Cuando se presione el hash #movie= se realizaran los siguientes cambios:
     * El header de la sección con la imagen de la película sera visible.
     * La flecha para volver se le quitara la clase inactive (sera visible).
     * El titulo principal y el titulo de la categoría se ocultaran.
     * El formulario de búsqueda se ocultara.
     * Se dejan activas (visibles) las secciones con remove: - detalles de películas 
     * Se dejan inactivas (ocultas) las secciones con add: - tendencias - categorías - lista genérica 
     */

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
}

function searchPage() {
    console.log('Search!!');

    /**
     * N9.6: Cuando se presione el hash #search= se realizaran los siguientes cambios:
     * El header de la sección estará oculto.
     * La flecha para volver se le quitara la clase inactive (sera visible).
     * El titulo principal y el titulo de la categoría se ocultaran.
     * El formulario de búsqueda sera visible.
     * Se dejan activas (visibles) las secciones con remove: - lista genérica  
     * Se dejan inactivas (ocultas) las secciones con add: - tendencias - categorías - detalles de películas 
     */
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}

function trendsPage() {
    console.log('TRENDS!!');

    /**
     * N9.7: Cuando se presione el hash #trends se realizaran los siguientes cambios:
     * El header de la sección estará oculto.
     * La flecha para volver se le quitara la clase inactive (sera visible) y de color blanco.
     * El titulo principal se ocultara y el titulo de la categoría estará visible.
     * El formulario de búsqueda se ocultara.
     * Se dejan activas (visibles) las secciones con remove: - lista genérica  
     * Se dejan inactivas (ocultas) las secciones con add: - tendencias - categorías - detalles de películas 
     */
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}