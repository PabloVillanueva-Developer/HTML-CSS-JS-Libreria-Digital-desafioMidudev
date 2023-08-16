/* FUNCION GENERADORA DE CARDS ZONA PRINCIPAL */

let displayBooks = (array) => {
    const containerCatalogo = document.getElementById('carrouselContainer');
    for (const iterator of array) {
       
        const cards = document.createElement('div')
        cards.classList.add('main__section__div')

        cards.innerHTML = `
            <div id='${iterator.book.genre}' class="main__section__div__card"
     
                <a href="#"> 
                    <img class="main__section__div__card__img" id='${iterator.book.title}' src="${iterator.book.cover}" draggable="true">
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
                    <img  class='zonaLectura__cardsContainer__cardsLibros__div__carritoCompras' id='${element.book.ISBN}' src='./assets/imgs/carritoCompras.png'/>
                </a>
                <a href='#'> 
                    <img id='${element.book.title}' class='zonaLectura__cardsContainer__cardsLibros__div__butEliminar' src='./assets/imgs/botonEliminar.png' href='#'/>
                </a>
            </div>
        </div>
    `
    cardsZonaLectura.appendChild(card)
    eliminarLibrosUnicos()
    actualizarContadorLibrosZonaLectura()
    
     /* SE AGREGAN LISTENERS DESPUES DE GENERAR CARDS SELECCION LECTURA PARA EVITAR DESINCRONIZACION CON LOS ELEMENTOS HTML DOM DINAMICOS DE ESTA FUNCION */
                            /* QUE SE DEBEN GENERAR ANTES DE LA ASIGNACION DE LOS LISTENERS */
}  
}


/* DISPLAY BOOKS CARRITO COMPRAS */

let displayBooksCarrito = () => {
    const cardsZonaLectura = document.getElementById('carritoComprasGrillaLibros')
    


    for (const element of seleccionCarrito) {     
        const card = document.createElement('div');
        card.classList.add('carritoCompras__divs')
        card.setAttribute('id', `${element.book.cover}`)
        card.innerHTML = `
            <div id='divLibrosSeleccionados' class="carritoCompras_divs--imgContainer">
                 
                <a class='carritoCompras__divs__imgContainer__butEliminar' href='#'> 
                    <img id='${element.book.title}' class='carritoCompras__divs__imgContainer__butEliminar--img' src='./assets/imgs/botonEliminar.png' href='#'/>
                </a>
                
                <img id='${element.book.title}' class="carritoCompras__divs__img" src="${element.book.cover}" alt="">
                <div id='${element.book.title + '--Buttons' }' class=''>   
                </div>
            </div>
        `
        cardsZonaLectura.appendChild(card)
        eliminarLibrosUnicosCarrito()
        actualizarContadorLibrosCarrito()
      


        
         /* SE AGREGAN LISTENERS DESPUES DE GENERAR CARDS SELECCION LECTURA PARA EVITAR DESINCRONIZACION CON LOS ELEMENTOS HTML DOM DINAMICOS DE ESTA FUNCION */
                                /* QUE SE DEBEN GENERAR ANTES DE LA ASIGNACION DE LOS LISTENERS */
    }  
    }








/* FUNCION RESETEADORA DE CARDS ZONA LECTURA*/

let borrarCardsAnterioresListaLectura = () => {
    const eliminarCards = document.querySelectorAll('.zonaLectura__cardsContainer__div')
    eliminarCards.forEach((card) => card.remove())
    }

let borrarCardsAnterioresCarrito = () => {
    const eliminarCards = document.querySelectorAll('.carritoCompras__divs')
    eliminarCards.forEach((card) => card.remove())
    }



/* ELIMINAR CARDS ZONA LECTURA INDIVIDUALMENTE */

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
        actualizarContadorLibrosZonaLectura() 
        if(seleccionLectura.length == 0)
            desactivarButEliminarZonaLectura()
        })
    }
  
}



/* ELIMINAR CARDS CARRITO INDIVIDUALMENTE */

let eliminarLibrosUnicosCarrito = () => {
    const butElimninarLibroUnico = document.getElementsByClassName('carritoCompras__divs__imgContainer__butEliminar--img')
 
    for (const element of butElimninarLibroUnico){
    element.addEventListener('click',(e) => { /* CAPTURA ID DINAMICO */
        const idDinamico = e.target.id
  
        seleccionCarrito = seleccionCarrito.filter((element) => element.book.title !== idDinamico)
         localStorage.setItem('seleccionCarrito', JSON.stringify(seleccionCarrito))

        borrarCardsAnterioresCarrito()
        displayBooksCarrito()
        actualizarContadorLibrosCarrito  ()
    
        
           
        })
    }
  
}


/* ACTIVAR/DESACTIVAR CESTA ZONA LECTURA */
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


/* FUNCION CON LOGICA PARA DESPLEGAR SELECCION LECTURA EN ZONA LECTURA. 
ES UTILIZADA POR LOS EVENTOS DE DESPLAZAMIENTO PARA EJECUTRA UNA VEZ QUE EL ARRASTRE LLEGA A LOS CONTENEDORES */
let idDinamicoB = '' 
let idDinamicoA = '' 

const dropZonaLectura = (e) => {
    borrarCardsAnterioresListaLectura()
    library.forEach((element) => { 
        if (idDinamicoB === element.book.title + ' B ') {
            if(!seleccionLectura.find(item => item.book.title === idDinamicoA))
            
            seleccionLectura.push(element)
            localStorage.setItem('seleccionLectura', JSON.stringify(seleccionLectura))
            displayBooksZonaLectura(seleccionLectura) 
            agregarLibrosCarritoArrastre()
            agregarLibrosZonaCarritodeZonaLectura()
            if(seleccionLectura.length > 0) 
                activarButEliminarZonaLectura()  
        }
    })}



/* AGREGAR LIBROS POR ARRASTRE A CARRITO */  
let agregarLibrosCarritoArrastre = () => {

    setTimeout(() => {
        const coleccionLibros = document.querySelectorAll('.main__section__div__card__img')
        const contenedorCarrito = document.getElementById('carritoCompras')
        let idDinamicoB = '' 
        let idDinamicoA = '' 
       
        
        for (const element of coleccionLibros) {
            element.addEventListener('dragstart', (e) => {
                idDinamicoB = e.target.id + ' B '
                idDinamicoA = e.target.id
            })
    
            contenedorCarrito.addEventListener ('drop', (e) => {
                borrarCardsAnterioresCarrito()
                library.forEach((element) => { 
                    if (idDinamicoB === element.book.title + ' B ') {
                        if(!seleccionCarrito.find(item => item.book.title === idDinamicoA))
                        
                        seleccionCarrito.push(element)
                        localStorage.setItem('seleccionCarrito', JSON.stringify(seleccionCarrito))
                        displayBooksCarrito(seleccionCarrito) 
                        if(seleccionCarrito.length > 0) 
                            activarButEliminarZonaLectura()         
                    }
                }) 
            })
          
            contenedorCarrito.addEventListener ('dragover', (e) => {
                e.preventDefault();
            }) 

        }   
    }, 1);   

    agregarLibrosZonaCarritodeZonaLectura()

}



/* AGREGAR LIBROS AL CARRITO DESDE ZONA DE LECTURA */

const agregarLibrosZonaCarritodeZonaLectura = () => {
  

const carritoComprasZonaLectura = document.querySelectorAll('.zonaLectura__cardsContainer__cardsLibros__div__carritoCompras')

for (const element of carritoComprasZonaLectura) {
    element.addEventListener('click', (e) => {
        console.log('el click funciona')
    
        const idDinamico = e.target.id
       library.forEach((element) => {
        if (idDinamico === element.book.ISBN)
            if(!seleccionCarrito.find(item => item.book.ISBN === idDinamico))
          
                        
                        seleccionCarrito.push(element)
                        localStorage.setItem('seleccionCarrito', JSON.stringify(seleccionCarrito))
                        borrarCardsAnterioresCarrito()
                        displayBooksCarrito(seleccionCarrito) 
                     
       })

    })}}


/* ARRASTRE LIBROS A ZONA DE LECTURA */  
let agregarLibrosSeleccionLectura = () => {

    setTimeout(() => {
        const coleccionLibros = document.querySelectorAll('.main__section__div__card__img')
        const contenedorDragZonaLectura = document.getElementById('contenedorDragZonaLectura')
        const contenedorDragZonaLecturaDirecto = document.getElementById('zonaLectura--container')
  
        
        for (const element of coleccionLibros) {
            element.addEventListener('dragstart', (e) => {
                idDinamicoB = e.target.id + ' B '
                idDinamicoA = e.target.id
            })


            element.addEventListener('touchstart', (e) => {
                idDinamicoB = e.target.id + ' B '
                idDinamicoA = e.target.id
   
            });


             // ARRASTRE A CONTENEDOR DE ENVIO PARA ZONA LECTURA (Evento de ratón)
            contenedorDragZonaLectura.addEventListener ('drop', dropZonaLectura) 
            // ARRASTRE A CONTENEDOR DE ENVIO PARA ZONA LECTURA (Evento táctil)
            contenedorDragZonaLectura.addEventListener('touchend', dropZonaLectura);
               // Permitir soltar en el área (Evento de ratón)
            contenedorDragZonaLectura.addEventListener ('dragover', (e) => { e.preventDefault()}) 
            // Permitir soltar en el área (Evento táctil)
            contenedorDragZonaLectura.addEventListener('touchmove', (e) => { e.preventDefault();});



            // ARRASTRE DIRECTO A ZONA LECTURA (Evento de ratón)
            contenedorDragZonaLecturaDirecto.addEventListener('drop', dropZonaLectura);
            // ARRASTRE DIRECTO A ZONA LECTURA (Evento táctil)
            contenedorDragZonaLecturaDirecto.addEventListener('touchend', dropZonaLectura);
            
            // Permitir soltar en el área (Evento de ratón)
             contenedorDragZonaLecturaDirecto.addEventListener('dragover', (e) => {e.preventDefault();});
            // Permitir soltar en el área (Evento táctil)
            contenedorDragZonaLecturaDirecto.addEventListener('touchmove', (e) => {e.preventDefault(); console.log('elTouchfunciona')});
        }   
    }, 1);
}
    

    /* CONTADOR DE CARRITO */
const actualizarContadorLibrosCarrito = () => {
const carritoComprasContadorNumerico = document.getElementById('carritoComprasContadorNumerico')
carritoComprasContadorNumerico.innerText = seleccionCarrito.length
}

/* CONTADOR ZONA LECTURA */
const actualizarContadorLibrosZonaLectura = () => {
    const sectionBotonZonaLecturaContador = document.getElementById('sectionBotonZonaLecturaContador')
    sectionBotonZonaLecturaContador.innerText = seleccionLectura.length   
    }
    




/* NO AGREGA DE ZONA LECTURA A CARRITO */

/* 
4) Agregar promesa para .json 
6) Agregar sweetalert para agregado a Zona Lectura y Carrito
7) Sino es complicado que los libros tengan el dedito de clickeable
8) Agregar accion que agnande la imagen de los libros al clikearlos
8) Agregar pantalla de sitio en construccion para todos los links muertos (al filtro hacer que se destaque el select)
10) Agregar titulo y favicon
11) Completar etiquetas alt
11) Pasar imagenes por un optimizador de peso
12) Ver si puedo eficientizar codigo
13) Hacer Responsive 
14) Agregar eventos tuch para las mismas interacciones*/