const containerCatalogo = document.getElementById('main__section');


    
for (const iterator of library) {

    const cards = document.createElement('div')
    cards.classList.add('main__section__div')
    cards.innerHTML = `
        <div class="main__section__div__card">
            <ul class="main__section__div__card__back"> 
                <li>Genero: ${iterator.book.genre}</li>
                <li>Paginas: ${iterator.book.pages}</li>
                <li>Año: ${iterator.book.year}</li>
                <li>Autor: ${iterator.book.author.name}</li>
            </ul>

            <div class="main__section__div__card__button">
                <a href="#" class="main__section__div__card__button__a">Agrega a Lista de Lectura</a>
            </div>
            
            <img class="main__section__div__card__img" src="${iterator.book.cover}" alt="">
        </div>

        <ul class="main__section__div__card__data">
            <li class="main__section__div__card__data__li">${iterator.book.title}</li>
            <li>${iterator.book.ISBN}</li>
        </ul>
    `

    containerCatalogo.appendChild(cards);
    

}



const botonAbrirZonaLectura = document.getElementById('botonAbrirZonaLectura')
botonAbrirZonaLectura.addEventListener('click', (event) => {
    zonaLectura.classList.add('main__section--zonaLectura--visible')
    zonaLectura.classList.remove('main__section--zonaLectura')
    console.log(zonaLectura)
})

const botonCerrarZonaLectura = document.getElementById('cierreX')
botonCerrarZonaLectura.addEventListener('click', event => {
    zonaLectura.classList.remove('main__section--zonaLectura--visible')
    zonaLectura.classList.add('main__section--zonaLectura')
    console.log(zonaLectura)
})
  
/* YA SE PUEDE TRABAJAR ESPECIFICAMENTE EN FUNCIONES Y LOGICA DE JS */

/* CREAR FILTRO DE LIBROS POR GENERO */
/* PASAR LIBROS A ZONA DE LECTURA */
/* ELMINAR LIBROS DE ZONA DE LECTURA */
/* ZONA DE LECTURA ARMARLA CON ESTETIA DE LIBROS CORREDIZO COMO SW */
/* AGREGAR LOCALSTORAGE PARA MEMORIA DE SELECCION DE LIBROS */
/* TERMINADAS LAS FUNCIONALIDADES MEJORAR ESTETICA */

