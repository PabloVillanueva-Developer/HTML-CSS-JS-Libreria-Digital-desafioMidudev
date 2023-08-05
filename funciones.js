/* FUNCION GENERADORA DE CARDS */

let displayBooks = (array) => {
    const containerCatalogo = document.getElementById('carrouselContainer');
    for (const iterator of array) {
    
        const cards = document.createElement('div')
        cards.classList.add('main__section__div')
        cards.innerHTML = `
            <div id='${iterator.book.genre}' class="main__section__div__card">

                <a class='main__section__div__card__a' href="#" > 
                    <img id='${iterator.book.title}' class="main__section__div__card__img--botonAgregarLibro" src='./assets/imgs/agregarLibro.png' alt="">
                </a>
     
                <div class="main__section__div__card__container">
                    <a href="#" class="main__section__div__card__button"> 
                        <img class='main__section__div__card__button__a__carritoCompras' src='./assets/imgs/carritoCompras.png' />
                    </a>
                </div>
                
                <img class="main__section__div__card__img" src="${iterator.book.cover}" alt="">
             
                
            </div>
        `
        containerCatalogo.appendChild(cards);
    }
}



/* FUNCION RESETEADORA DE CARDS */

let borrarCardsAnteriores = () => {
const eliminarCards = document.querySelectorAll('.main__section__div')
eliminarCards.forEach((card) => card.remove())
}



/* FUNCION RESETEADOR DE POSICION DEL CONTENEDOR DEL CARROUSEL PARA QUE EN CADA CAMBIO DE FILTRO APAREZCA CENTRADO */

const resetPosicionCarrousel = () => {
    carrouselContainer.style.transform = `translateX(0)`
}
   


/* ACTIVACION Y DESACTIVACION DE BOTONES DEL CARROUSEL SEGUN CANTIDAD DE CARDS */
let agregarBotonDer = () => {  
    if (contadorPosiciones === (seleccionFiltro.length-5))
        {carrouselContainer.style.transform += `translateX(0)`;contadorPosiciones = seleccionFiltro.length-5}
    else {carrouselContainer.style.transform += `translateX(-13.3rem)`;contadorPosiciones++}}

let agregarBotonIzq = () => {
     contadorPosiciones--
    if (contadorPosiciones === -1)
        {carrouselContainer.style.transform += `translateX(0)`;contadorPosiciones = 0}
    else {carrouselContainer.style.transform += `translateX(13.3rem)`}}

/* 
let activacionCarrousel = () => {
    carrouselButtonIzq.addEventListener('click', agregarBotonIzq);
    carrouselButtonDer.addEventListener('click', agregarBotonDer);
}
  
let desactivacionCarrousel = () => {
    carrouselButtonIzq.removeEventListener('click', agregarBotonIzq);
    carrouselButtonDer.removeEventListener('click', agregarBotonDer);
    };
       */

/* AGREGA LIBROS A SECTION LECTURA DESDE PRINCIPAL AL APRETAR BOTONES DE AGREGAR LIBRO
 + FUNCION ACTIVA LISTENER PARA BOTONES DE AGREGAR LIBRO // PERMITE REACTIVAR LOS LISTENERS CADA VEZ QUE SE ACTUALIZAN LOS FILTROS */

let agregarLibrosSeleccionLectura = () => {
    for (const element of listaLecturaButtons) {
        
        element.addEventListener('click',(e) => {
            borrarCardsAnterioresListaLectura()
            const idDinamico = e.target.id
            library.forEach((element) => { 
        
                if (idDinamico === element.book.title) { 
                    if(!seleccionLectura.find(item => item.book.title === idDinamico)) 
                    seleccionLectura.push(element)
                    localStorage.setItem('seleccionLectura', JSON.stringify(seleccionLectura))
                    displayBooksZonaLectura(seleccionLectura) 
                    if(seleccionLectura.length > 0)
                        activarButEliminarZonaLectura() 
                  
                }
            });
        })
    }   
} 
    


/* CREAR CARDS DE ZONA DE LECTURA */

let displayBooksZonaLectura = () => {
const cardsZonaLectura = document.getElementById('zonaLecturaCardsContainer')
for (const element of seleccionLectura) {
    
 
    const card = document.createElement('div');
    card.classList.add('zonaLectura__cardsContainer__div')
    card.setAttribute('id', `${element.book.cover}`)
    card.innerHTML = `
        <div id='divLibrosSeleccionados' class="zonaLectura__cardsContainer__cardsLibros">
            <img id='${element.book.title}' class="zonaLectura__cardsContainer__cardsLibros__img" src="${element.book.cover}" alt="">
            <div id='${element.book.title + '--Buttons' }' class='zonaLectura__cardsContainer__cardsLibros__div'>
                <a href='#'> 
                    <img  class='zonaLectura__cardsContainer__cardsLibros__div__carritoCompras' src='./assets/imgs/carritoCompras.png'/>
                </a>
                <a href='#'> 
                    <img id='${element.book.title}' class='zonaLectura__cardsContainer__cardsLibros__div__butEliminar' src='./assets/imgs/botonEliminar.png' href='#'/>
                </a>
            </div>
        </div>
    `
    cardsZonaLectura.appendChild(card)
    eliminarLibrosUnicos()
     /* SE AGREGAN LISTENERS DESPUES DE GENERAR CARDS SELECCION LECTURA PARA EVITAR DESINCRONIZACION CON LOS ELEMENTOS HTML DOM DINAMICOS DE ESTA FUNCION */
                            /* QUE SE DEBEN GENERAR ANTES DE LA ASIGNACION DE LOS LISTENERS */
}}



/* FUNCION RESETEADORA DE CARDS ZONA LECTURA*/

let borrarCardsAnterioresListaLectura = () => {
    const eliminarCards = document.querySelectorAll('.zonaLectura__cardsContainer__div')
    eliminarCards.forEach((card) => card.remove())
    }


let eliminarLibrosUnicos = () => {
    const butElimninarLibroUnico = document.getElementsByClassName('zonaLectura__cardsContainer__cardsLibros__div__butEliminar')
    for (const element of butElimninarLibroUnico){
    element.addEventListener('click',(e) => { /* CAPTURA ID DINAMICO */
        const idDinamico = e.target.id
  
        seleccionLectura = seleccionLectura.filter((element) => element.book.title !== idDinamico)
         localStorage.setItem('seleccionLectura', JSON.stringify(seleccionLectura))
        if(seleccionLectura.length == 0)
            {resetDescripcionesZonaLectura()}
        borrarCardsAnterioresListaLectura()
        displayBooksZonaLectura()
        if(seleccionLectura.length == 0)
            desactivarButEliminarZonaLectura()
        })
    }
  
}


/* RESET DESCRIPCION LIBROS ZONA LECTURA */
const resetDescripcionesZonaLectura = () => {

    zonaLecturaGenero.innerText = `` 
    zonaLecturaPaginas.innerText = ``
    zonaLecturaSynopsis.innerText = ``
    zonaLecturaAnio.innerText = ``
    zonaLecturaAutor.innerText = ``
    zonaLecturaObras.innerText = ``
    zonaLecturaISBN.innerText = ``

}

/* DESAPARECER BOTON ELIMINAR */

    const activarButEliminarZonaLectura = () => {
    const catchCestaEliminar = document.querySelector('.zonaLecturaCards__Container__flex__a--invisible') //Captura elemento en DOM
    
    catchCestaEliminar.classList.add('zonaLecturaCards__Container__flex__a--visible')
    catchCestaEliminar.classList.remove('zonaLecturaCards__Container__flex__a--invisible')     
    }

    const desactivarButEliminarZonaLectura = () => {
        const catchCestaEliminar = document.querySelector('.zonaLecturaCards__Container__flex__a--visible') //Captura elemento en DOM
        
     
        catchCestaEliminar.classList.add('zonaLecturaCards__Container__flex__a--invisible')
           catchCestaEliminar.classList.remove('zonaLecturaCards__Container__flex__a--visible')     
        }
    
    

