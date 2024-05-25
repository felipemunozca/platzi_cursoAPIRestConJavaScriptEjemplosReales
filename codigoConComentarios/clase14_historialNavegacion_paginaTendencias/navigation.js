searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

//arrowBtn.addEventListener('click', () => {
    // location.hash = '#home';
    /**
     * N14.1: Ahora al presionar el botón con la flecha de volver hacia atrás, se ejecutara una función llamada history y el 
     *      método back() que es propio de JavaScript.
     */
    //history.back();
//});

/**
 * N14.2: DESAFIÓ DE LA CLASE.
 * Crear un condicional en el caso en que se envié la url ya directamente desde una búsqueda, por ejemplo buscar dinosaurios y 
 *      enviarle el enlace a otra persona, que al presionar el botón volver lo envié a la vista home y NO a la pagina blank del
 *      navegador.
 * 
 * N14.3: Se utiliza el código de un compañero como base.
 * Se crea un arreglo "historial" donde se irán guardando las búsquedas.
 * Se redeclara el evento click del botón arrowBtn, al presionar el botón se eliminara el ultimo valor ingresado al arreglo mediante
 *      el método pop(). 
 * Se crea una condición, si el largo del arreglo es mayor a 0, el hash de la búsqueda sera el valor de historial menos -1 una
 *      posición (para volver a la búsqueda anterior). En caso contrario, si el valor en igual o menor a cero, el valor del hash
 *      sera home y se enviara al usuario a la vista principal.
 */
let historial = [];

arrowBtn.addEventListener('click', () => {
    historial.pop()
    
    if (historial.length > 0) {
        location.hash = '#search=' + historial[historial.length - 1]
    } else {
        location.hash = '#home'
    }
})

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

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

}


function homePage() {
    // console.log('Home!!');

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
    // console.log('categories!!');

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

    const [_, categoryData] = location.hash.split('='); // ['url#category', 'id-name']
    const [categoryId, categoryName] = categoryData.split('-'); //['id', 'name']

    //headerCategoryTitle.innerHTML = categoryName;
    headerCategoryTitle.innerHTML = decodeURI(categoryName);
    
    getMoviesByCategory(categoryId);
}

function movieDetailsPage() {
    // console.log('Movie!!');

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
    // console.log('Search!!');

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

    const [_, query] = location.hash.split('='); // ['url#search', 'id-name']
    getMoviesBySearch(query);
}

function trendsPage() {
    // console.log('TRENDS!!');

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

    /**
     * N14.5: Se agrega el titulo de la sección.
     * Se llama la función getTrendingMovies() para que pueda ser inicializada.
     */
    headerCategoryTitle.innerHTML = 'Tendencias';
    getTrendingMovies();
}