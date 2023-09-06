const { src, dest, watch, parallel } = require("gulp");

//css
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber'); // evitar que de error al agregar contenido css en _variable.scss

//imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {

    src('src/scss/**/*.scss')//Identificar el archivo sass
        .pipe(plumber())
        .pipe(sass())//Compilarlo
        .pipe(dest('build/css'));//Almacen en el disco duro

    done();//collback que avisa a gulp cuando llegamos al final
}

//version webp
function versionWebp(done) {

    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')//elejir un formato
        .pipe(webp(opciones))
        .pipe(dest('build/img'))//almacenar en el disco duro

    done();
}

//imagenes 
function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')//elejir un formato
    .pipe(cache(imagemin(opciones)))//en Cache
    .pipe(dest('build/img'))

    done();
}

//version avif
function avifs(done) {

    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')//elejir un formato
        .pipe(avif(opciones))
        .pipe(dest('build/img'))//almacenar en el disco duro

    done();
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'))

    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes
exports.versionWebp = versionWebp;
exports.avifs = avifs;
exports.dev = parallel(avifs,imagenes,versionWebp, javascript,dev);

//instalar un conector par gulp que compile con soss
//npm i --save-dev gulp-sass
//consola: npx gulp css