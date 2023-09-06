document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
}

//cargando las imagenes
function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 0; 1 <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML =
            `
        <source srcset="build/img/thumb/${i}.avif" type="imagen avif">
        <source srcset="build/img/thumb/${i}.webp" type="imagen webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"
            alt="imagen galeria>
        `;

        imagen.onclick = function () {
            mostrarImagen(i);
        }
        galeria.appendChild(imagen)

    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML =
        `
    <source srcset="build/img/grande/${id}.avif" type="imagen avif">
    <source srcset="build/img/grande/${id}.webp" type="imagen webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg"
        alt="imagen galeria>
    `;

    //crea el overlay a la imagen
    const overlay = document.createElement('DIV');
    overlay.oppendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    //lo agrega al HTML
    const body = document.querySelector('body');
    body.oppendChild(overlay);
    body.classList.add('fijar-body');

    //boton para cerrar el modal
    const modal = document.createElement('P');
    modal.textContent = 'X';
    modal.classList.add('btn-cerrar');
    modal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(modal);


}