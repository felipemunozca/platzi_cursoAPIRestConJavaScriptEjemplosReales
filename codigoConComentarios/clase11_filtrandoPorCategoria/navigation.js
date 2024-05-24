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

    /**
     * N11.3: Para poder obtener el id de cada categoría (genero) y enviarlo hacia la función getMoviesByCategory() se debe
     *      manipular la información que esta recibiendo en location.hash
     * Lo primero sera convertir la información en un string y luego separarla en dos:
     *      - el inicio de la url, hasta category=
     *      - el id con el nombre
     * Se utiliza el método split() para decirle que cree un arreglo y que cada elemento del arreglo sera separado cuando encuentre
     *      un valor "=" (antes del es igual sera un elemento, después del es igual sera otro elemento).
     * Utilizando ES6+, se puede desestructurar un arreglo directamente utilizando variables y dándole las posiciones del arreglo,
     *      en este caso serán las posiciones [0, 1]. La posición 0 que seria toda la url antes del "=" no la necesito por lo que se
     *      puede colocar solo un guion bajo _ que no utilizare. La posición 1 sera todo lo que vaya despues del signo = que seria el
     *      id con el nombre concatenado.
     * Ya con los valores separados, se vuelven a desestructurar el arreglo, esta vez en dos posiciones que estaran separadas por un
     *      guion "0". En la posición 0 quedara el id, en la posición 1 quedara el nombre. 
     * El nombre de la categoría, se agregara dentro de una etiqueta en html.
     * 
     * N11.4: DATO IMPORTANTE: cuando se obtiene el nombre de la categoría en español, si viene con tildes o la letra ñ se generara un
     *      error ya que no reconocerá esos caracteres, por lo que se debe deificar el valor utilizando el valor del charset del 
     *      index.html el cual seria UTF-8. 
     */
    
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
}