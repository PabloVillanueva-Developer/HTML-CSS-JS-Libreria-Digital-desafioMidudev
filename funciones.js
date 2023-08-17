/* FUNCION GENERADORA DE CARDS ZONA PRINCIPAL */

let displayBooks = (array) => {
    const containerCatalogo = document.getElementById('carrouselContainer');
    for (const iterator of array) {
       
        const cards = document.createElement('div')
        cards.classList.add('main__section__div')

        cards.innerHTML = `
            <div id='${iterator.book.genre}' class="main__section__div__card"
     
                <a href="#"> 
                    <img class="main__section__div__card__img" id='${iterator.book.title}' src="${iterator.book.cover}">
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
        if (seleccionLectura.some((element) => element.book.title == idDinamico))
                {{ Toastify({
                    text: "¡Libro(s) eliminado(s) del Carrito",
                    duration: 3000,
                    gravity: "top",
                    style: {
                        background: "linear-gradient(147deg, #FFE53B 0%, #FF2525 38%)"},
                    stopOnFocus: true,
                }).showToast()}
                seleccionLectura = seleccionLectura.filter((element) => element.book.title !== idDinamico)
                localStorage.setItem('seleccionLectura', JSON.stringify(seleccionLectura))
               if(seleccionLectura.length == 0)
                   {resetDescripcionesZonaLectura()}
               borrarCardsAnterioresListaLectura()
               displayBooksZonaLectura()
               actualizarContadorLibrosZonaLectura() 
               if(seleccionLectura.length == 0)
                   desactivarButEliminarZonaLectura()}

      
        
        })
    }
  
}



/* ELIMINAR CARDS CARRITO INDIVIDUALMENTE */

let eliminarLibrosUnicosCarrito = () => {
    const butElimninarLibroUnico = document.getElementsByClassName('carritoCompras__divs__imgContainer__butEliminar--img')

 
    for (const element of butElimninarLibroUnico){
    element.addEventListener('click',(e) => { /* CAPTURA ID DINAMICO */
    e.stopPropagation();

     

        const idDinamico = e.target.id  
        const libroAEliminar = seleccionCarrito.find((element) => element.book.title === idDinamico);
        if (libroAEliminar) {
            Toastify({
                text: "¡Libro(s) eliminado(s) del Carrito",
                duration: 3000,
                gravity: "top",
                style: {
                    background: "linear-gradient(147deg, #FFE53B 0%, #FF2525 38%)"},
                stopOnFocus: true,
            }).showToast();

        seleccionCarrito = seleccionCarrito.filter((element) => element.book.title !== idDinamico) 
       
    }
            
        
        localStorage.setItem('seleccionCarrito', JSON.stringify(seleccionCarrito))
        borrarCardsAnterioresCarrito()
        actualizarContadorLibrosCarrito  ()
        displayBooksCarrito()
        
      
        


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
    borrarCardsAnterioresCarrito()
    library.forEach((element) => { 
        if (idDinamicoB === element.book.title + ' B ') {
            if(!seleccionLectura.find(item => item.book.title === idDinamicoA))
            
            {seleccionLectura.push(element);
                    Toastify({
                        text: "¡Libro(s) añadido(s) a Zona de Lectura!",
                        duration: 3000,
                        gravity: "top",
                        style: {
                            background: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)"},
                        stopOnFocus: true,
                    }).showToast();}
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
    const coleccionLibros = document.querySelectorAll('.main__section__div__card__img');
    const contenedorCarrito = document.getElementById('carritoCompras');
    
    let idDinamicoB = '';
    let idDinamicoA = '';

    for (const element of coleccionLibros) {
        element.addEventListener('dragstart', (e) => {
            idDinamicoB = e.target.id + ' B ';
            idDinamicoA = e.target.id;
        });
    }

    contenedorCarrito.addEventListener('dragover', (e) => {
        e.preventDefault();
    });



    contenedorCarrito.addEventListener('drop', (e) => {
        e.preventDefault();

        if (idDinamicoB && idDinamicoA) {
            const elementToAdd = library.find(element => idDinamicoB === element.book.title + ' B ');

            if (elementToAdd && !seleccionCarrito.some(item => item.book.title === idDinamicoA)) {
                seleccionCarrito.push(elementToAdd);
                
                Toastify({
                    text: "¡Libro(s) añadido(s) a Carrito!",
                    duration: 3000,
                    gravity: "top",
                    style: {
                        background: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)"
                    },
                    stopOnFocus: true,
                }).showToast();
                
                localStorage.setItem('seleccionCarrito', JSON.stringify(seleccionCarrito));
                borrarCardsAnterioresCarrito();
                displayBooksCarrito(seleccionCarrito);
                
                if (seleccionCarrito.length > 0) {
                    activarButEliminarZonaLectura();
                }
            }
        }

        idDinamicoB = '';
        idDinamicoA = '';
    });

   

    agregarLibrosZonaCarritodeZonaLectura();
};


/* AGREGAR LIBROS AL CARRITO DESDE ZONA DE LECTURA */

const agregarLibrosZonaCarritodeZonaLectura = () => {
  

const carritoComprasZonaLectura = document.querySelectorAll('.zonaLectura__cardsContainer__cardsLibros__div__carritoCompras')

for (const element of carritoComprasZonaLectura) {
    element.addEventListener('click', (e) => {

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
        
               // Permitir soltar en el área (Evento de ratón)
            contenedorDragZonaLectura.addEventListener ('dragover', (e) => { e.preventDefault()}) 
          



            // ARRASTRE DIRECTO A ZONA LECTURA (Evento de ratón)
            contenedorDragZonaLecturaDirecto.addEventListener('drop', dropZonaLectura);
     
            
            // Permitir soltar en el área (Evento de ratón)
             contenedorDragZonaLecturaDirecto.addEventListener('dragover', (e) => {e.preventDefault();});
           
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




/* DISPLAY DE CARDS EN SECTION PRINCIPAL SEGUN SELECCION DE FILTRO */
const displayCardsSegunFilto = () => {ejecutarFiltro = document.getElementById('filtrosDinamicos')
    ejecutarFiltro.addEventListener('click', (e) => {
        
        /* CREACION DE ARRAY CON SELECCION = seleccionFiltro */
         /* RESET DEL ARRAY PARA CADA CLICK INDIVIDUAL */
        seleccionFiltro = library.filter((objeto) => e.target.value === objeto.book.genre)
   
        borrarCardsAnteriores ()
       
        displayBooks(seleccionFiltro)
        agregarLibrosCarritoArrastre()
     
    
    }) 
}



/* ELIMINAR FILTROS/MOSTRAR TODOS LOS LIBROS ZONA PRINCIPAL*/
const eliminarFiltros = () => {resetFiltros = document.getElementById('filtrosDinamicos')

    resetFiltros.addEventListener('click', (e) => {
     
        if (e.target.value === 'eliminarFiltros')
        seleccionFiltro = library.map((objetosInternos) => {return objetosInternos}) 
        borrarCardsAnteriores()
        displayBooks(seleccionFiltro) 
        agregarLibrosSeleccionLectura() 
        agregarLibrosCarritoArrastre() 
        
       
        
      
    })
}
    



/* AGREGAR LIBROS AL ARRAY seleccionLectura / Compara si no esta agregado, lo sube*/


/* Revision seleccionLectura en localStorage al cargar pagina*/
const pushSeleccionLecturaVerificaNoRepetido = () => {document.addEventListener('DOMContentLoaded', () => {
    
   
    seleccionLectura = JSON.parse(localStorage.getItem('seleccionLectura'))
    if(seleccionLectura === null) {seleccionLectura = []} /* MANEJA ERROR SI NO ENCUENTRA ARCHIVO EN LOCAL*/
    if(seleccionLectura)
        displayBooksZonaLectura(seleccionLectura)
    if(seleccionLectura.length > 0) 
        activarButEliminarZonaLectura()
    
 
        
        /* seleccionLectura =[] */
    agregarLibrosSeleccionLectura()
    agregarLibrosCarritoArrastre()
    agregarLibrosZonaCarritodeZonaLectura()

  

   
})
}


/* Revision Carrito en localStorage al cargar pagina*/
const pushSeleccionCarritoVerificaNoRepetido = () => { document.addEventListener('DOMContentLoaded', () => {
    seleccionCarrito = JSON.parse(localStorage.getItem('seleccionCarrito'))
    if(seleccionCarrito === null) {seleccionCarrito = []} /* MANEJA ERROR SI NO ENCUENTRA ARCHIVO EN LOCAL*/
    if(seleccionCarrito)
        displayBooksCarrito()

 
    
 
      
   
      
})
}



/* ELIMINAR SELECCION LECTURA COMPLETA */

const eliminarSeleccionLecturaCompleto = () => {
let eliminarSeleccionLectura = document.getElementById('eliminarSeleccionLectura')

eliminarSeleccionLectura.addEventListener('click', () =>{
    borrarCardsAnterioresListaLectura()

        Toastify({
            text: "¡Libro(s) eliminado(s) de Zona de Lectura",
            duration: 3000,
            gravity: "top",
            style: {
                background: "linear-gradient(147deg, #FFE53B 0%, #FF2525 38%)"},
            stopOnFocus: true,
        }).showToast()

    localStorage.setItem('seleccionLectura', JSON.stringify(seleccionLectura = []))
    seleccionLectura = JSON.parse(localStorage.getItem('seleccionLectura'))
    resetDescripcionesZonaLectura()
    desactivarButEliminarZonaLectura()
    actualizarContadorLibrosZonaLectura()

})
}


/* ELIMINAR SELECCION CARRITO COMPLETA */
const eliminarSeleccionCarritoCompleto = () => {
let eliminarSeleccionCarrito = document.getElementById('eliminarSeleccionCarrito')


eliminarSeleccionCarrito.addEventListener('click', (e) =>{
    
    borrarCardsAnterioresCarrito()

        Toastify({
            text: "¡Libro(s) eliminado(s) de Zona de Lectura",
            duration: 3000,
            gravity: "top",
            style: {
                background: "linear-gradient(147deg, #FFE53B 0%, #FF2525 38%)"},
            stopOnFocus: true,
        }).showToast()

    localStorage.setItem('seleccionCarrito', JSON.stringify(seleccionCarrito = []))
    seleccionCarrito = JSON.parse(localStorage.getItem('seleccionCarrito'))
    carritoComprasContadorNumerico.innerText = seleccionCarrito.length  
/*     desactivarButEliminarZonaLectura() */

})
}

/* Toastify({
    text: "¡Libro(s) eliminado(s) de Zona de Lectura",
    duration: 3000,
    gravity: "top",
    style: {
        background: "linear-gradient(147deg, #FFE53B 0%, #FF2525 38%)"},
    stopOnFocus: true,
}).showToast() */



/* NO AGREGA DE ZONA LECTURA A CARRITO */

/* 

7) Sino es complicado que los libros tengan el dedito de clickeable
10) Agregar titulo y favicon
11) Completar etiquetas alt
11) Pasar imagenes por un optimizador de peso
12) Ver si puedo eficientizar codigo
13) Hacer Responsive (sencillo)     
14) Agregar eventos tuch para las mismas interacciones*/