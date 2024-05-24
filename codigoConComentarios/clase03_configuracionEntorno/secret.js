/**
 * N3.1: Se crea un archivo externo desde donde se llamara a la API KEY y asi ocultarla del archivo main.js.
 */
const API_KEY = 'secreto...';
const API_TOKEN = 'secreto...';

/**
 * N3.3: Para que este archivo con la KEY no se suba al repositorio en GitHub, se debe agregar al final del archivo .gitignore para
 * que sea ignorado.
 * Luego de agregarlo, si el texto con el nombre secrets.js no cambia de color, en la consola ejecutar el siguiente comando para que 
 * se guarden los cambios a .gitignore
 * > git add .gitignore
 */