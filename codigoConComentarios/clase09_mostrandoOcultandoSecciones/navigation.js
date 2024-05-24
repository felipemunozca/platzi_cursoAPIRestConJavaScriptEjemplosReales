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


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    // console.log({ location });
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