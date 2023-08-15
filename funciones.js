/* FUNCION GENERADORA DE CARDS ZONA PRINCIPAL */

let displayBooks = (array) => {
    const containerCatalogo = document.getElementById('carrouselContainer');
    for (const iterator of array) {
       
        const cards = document.createElement('div')
        cards.classList.add('main__section__div')

        cards.innerHTML = `
            <div id='${iterator.book.genre}' class="main__section__div__card"
     
                <a href="#"> 
                    <img class="main__section__div__card__img" id='${iterator.book.title}' src="${iterator.book.cover}" alt="">
                </a>
                
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
}  
}



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


    
/* ARRASTRE LIBROS A ZONA DE LECTURA */  
let agregarLibrosSeleccionLectura = () => {

    setTimeout(() => {
        const coleccionLibros = document.querySelectorAll('.main__section__div__card__img')
        const contenedorDragZonaLectura = document.getElementById('contenedorDragZonaLectura')
        let idDinamicoB = '' 
        let idDinamicoA = '' 



        
        for (const element of coleccionLibros) {
            element.addEventListener('dragstart', (e) => {
                idDinamicoB = e.target.id + ' B '
                idDinamicoA = e.target.id
              
            })
           
            contenedorDragZonaLectura.addEventListener ('drop', (e) => {
          
               
                borrarCardsAnterioresListaLectura()
                library.forEach((element) => { 
                    if (idDinamicoB === element.book.title + ' B ') {
                        if(!seleccionLectura.find(item => item.book.title === idDinamicoA))
                        
                        seleccionLectura.push(element)
                        localStorage.setItem('seleccionLectura', JSON.stringify(seleccionLectura))
                        displayBooksZonaLectura(seleccionLectura) 
                        if(seleccionLectura.length > 0) 
                            activarButEliminarZonaLectura()  
                       
                    }
                }) 
                   
              
            })

            contenedorDragZonaLectura.addEventListener ('dragover', (e) => {
                e.preventDefault();
              
                
            }) 


        }   
    }, 1);
}
    
/* DESAPARECER BOTON ELIMINAR */

const activarButEliminarZonaLectura = () => {   
    const activarCestaEliminar = document.querySelector('.zonaLecturaCards__Container__flex__a--invisible') //Captura elemento en DOM
   
    if (activarCestaEliminar !== null)
        {activarCestaEliminar.classList.add('zonaLecturaCards__Container__flex__a--visible'), 
        activarCestaEliminar.classList.remove('zonaLecturaCards__Container__flex__a--invisible')}
    }
   



    const desactivarButEliminarZonaLectura = () => {
        const desactivarCestaEliminar = document.querySelector('.zonaLecturaCards__Container__flex__a--visible') //Captura elemento en DOM
        
    desactivarCestaEliminar.classList.add('zonaLecturaCards__Container__flex__a--invisible')
    desactivarCestaEliminar.classList.remove('zonaLecturaCards__Container__flex__a--visible')     
        }
    



/* 
1) Agregar Logica de drop para carrito
2) Agregar carrito al carrito desde ZonaLectura
3) Agregar contador numerico visual en zona lectura y carrito
4) Agregar sweetalert para agregado a Zona Lectura y Carrito
5) Abrir zona lectura cada vez que se agrega un libro
6) Agregar promesa para .json 
7) Agregar boton de comprar a carrito 
8) Agregar pantalla de sitio en construccion para todos los links muertos (al filtro hacer que se destaque el select)
9) Hacer Responsive 
10) Agregar titulo y favicon
11) Completar etiquetas alt
 */