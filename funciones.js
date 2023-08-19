
/* AGREGAR LIBROS AL ARRAY seleccionLectura / Compara si no esta agregado, lo sube*/
/* Revision seleccionLectura en localStorage al cargar pagina*/
const pushSeleccionLecturaVerificaNoRepetido = () => {
    document.addEventListener('DOMContentLoaded', () => {
   
        seleccionLectura = JSON.parse(localStorage.getItem('seleccionLectura'))
        if(seleccionLectura === null) {seleccionLectura = []} /* MANEJA ERROR SI NO ENCUENTRA ARCHIVO EN LOCAL*/
        if(seleccionLectura)
            displayBooksZonaLectura(seleccionLectura)
        if(seleccionLectura.length > 0) 
            activarButEliminarZonaLectura()       
   
        agregarLibrosSeleccionLectura()
        agregarLibrosCarritoArrastre()
        agregarLibrosZonaCarritodeZonaLectura()
    })
}


/* Revision Carrito en localStorage al cargar pagina*/
const pushSeleccionCarritoVerificaNoRepetido = () => { document.addEventListener('DOMContentLoaded', () => {
    seleccionCarrito = JSON.parse(localStorage.getItem('seleccionCarrito'))
    if(seleccionCarrito === null) {seleccionCarrito = []} /* MANEJA ERROR SI NO ENCUENTRA ARCHIVO EN LOCAL*/
   
    })
}


/* FUNCION CREAR CARDS EN ZONA PRINCIPAL */

let displayBooks = (array) => {
    const containerCatalogo = document.getElementById('carrouselContainer');
    for (const iterator of array) {
       
        const cards = document.createElement('div')
        cards.classList.add('main__section__div')

        cards.innerHTML = `
            <a href='#' id='${iterator.book.genre}' class="main__section__div__card"
     
                <a href="#"> 
                    <img class="main__section__div__card__img" id='${iterator.book.title}' src="${iterator.book.cover}" alt='Tapa Libro' draggable="true">
                </a>
                
            </a>
        `
        containerCatalogo.appendChild(cards);
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
                        <img  class='zonaLectura__cardsContainer__cardsLibros__div__carritoCompras' id='${element.book.ISBN}' src='./assets/imgs/carritoCompras.png' alt='Imagen Portada'/>
                    </a>
                    <a href='#'> 
                        <img id='${element.book.title}' class='zonaLectura__cardsContainer__cardsLibros__div__butEliminar' src='./assets/imgs/botonEliminar.png' href='#' alt='Boton Eliminar'/>
                    </a>
                </div>
            </div>
        `
        cardsZonaLectura.appendChild(card)
        eliminarLibrosUnicosZonaLectura()
        actualizarContadorLibrosZonaLectura()
        
        /* SE AGREGAN LISTENERS DESPUES DE GENERAR CARDS SELECCION LECTURA PARA EVITAR DESINCRONIZACION CON LOS ELEMENTOS HTML DOM DINAMICOS DE ESTA FUNCION */
                                /* QUE SE DEBEN GENERAR ANTES DE LA ASIGNACION DE LOS LISTENERS */
    }  
}


/* CREAR LIBROS CARRITO COMPRAS */

let displayBooksCarrito = () => {
    const cardsZonaLectura = document.getElementById('carritoComprasGrillaLibros')
    
    for (const element of seleccionCarrito) {     
        const card = document.createElement('div');
        card.classList.add('carritoCompras__divs')
        card.setAttribute('id', `${element.book.cover}`)
        card.innerHTML = `
            <div id='divLibrosSeleccionados' class="carritoCompras_divs--imgContainer">
                 
                <a class='carritoCompras__divs__imgContainer__butEliminar' href='#'> 
                    <img id='${element.book.title}' class='carritoCompras__divs__imgContainer__butEliminar--img' src='./assets/imgs/botonEliminar.png' href='#' alt='Boton Eliminar'/>
                </a>
                
                <img id='${element.book.title}' class="carritoCompras__divs__img" src="${element.book.cover}" alt="Portada Libro">
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


/* DISPLAY DE CARDS EN SECTION PRINCIPAL SEGUN SELECCION DE FILTRO */
const displayCardsSegunFilto = () => {ejecutarFiltro = document.getElementById('filtrosDinamicos')
    ejecutarFiltro.addEventListener('change', (e) => {
       
        /* CREACION DE ARRAY CON SELECCION = seleccionFiltro */
         /* RESET DEL ARRAY PARA CADA CLICK INDIVIDUAL */
        seleccionFiltro = library.filter((objeto) => e.target.value === objeto.book.genre)
        borrarCardsAnteriores ()
        displayBooks(seleccionFiltro)

        borrarCardsAnterioresListaLectura()
        agregarLibrosSeleccionLectura()
        agregarLibrosZonaCarritodeZonaLectura()
     
    }) 
   /*  agregarLibrosSeleccionLectura(seleccionLectura) */
}

const rehablitarDisplayBooksZonaLectura = () => {
    const filtrosDinamicos = document.getElementById('filtrosDinamicos')
    filtrosDinamicos.addEventListener('change', () => {
        console.log('filtrosDinamicos')
        agregarLibrosSeleccionLectura()
    
    })
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
    



/* FUNCION CON LOGICA PARA DESPLEGAR SELECCION LECTURA EN ZONA LECTURA. 
ES UTILIZADA POR LOS EVENTOS DE DESPLAZAMIENTO PARA EJECUTRA UNA VEZ QUE EL ARRASTRE LLEGA A LOS CONTENEDORES */
let idDinamicoB = '' 
let idDinamicoA = '' 

const dropZonaLectura = () => {
    borrarCardsAnterioresListaLectura()

    library.forEach((element) => { 
        if (idDinamicoB === element.book.title + ' B ') {
            if(!seleccionLectura.find(item => item.book.title === idDinamicoA))
            
            {seleccionLectura.push(element);
                    Toastify({
                        text: "¡Libro(s) añadido(s) a Zona de Lectura!",
                        duration: 3000,
                        gravity: "top",
                        position: "left",
                        style: {
                            background: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)"},
                        stopOnFocus: true,
                    }).showToast();}
            localStorage.setItem('seleccionLectura', JSON.stringify(seleccionLectura))
            agregarLibrosSeleccionLectura() 
            displayBooksZonaLectura(seleccionLectura) 
        
            agregarLibrosCarritoArrastre()
            
          /*   agregarLibrosZonaCarritodeZonaLectura() */
            if(seleccionLectura.length > 0) 
                activarButEliminarZonaLectura()  
        }
    })
}


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

        element.addEventListener('touchstart', (e) => {
            idDinamicoB = e.target.id + ' B ';
            idDinamicoA = e.target.id;
        });  
    }

    contenedorCarrito.addEventListener('dragover', (e) => {e.preventDefault();
    });

    contenedorCarrito.addEventListener('touchstart', (e) => {
    });

                        /* ACA HAY ALGO RAROR CON ZONA LECTURA / VER */
    const dropLibroZonaCarrito = (e) => {

        if (idDinamicoB && idDinamicoA) {
            const elementToAdd = library.find(element => idDinamicoB === element.book.title + ' B ');

            if (elementToAdd && !seleccionCarrito.some(item => item.book.title === idDinamicoA)) {
                seleccionCarrito.push(elementToAdd);
                
                Toastify({
                    text: "¡Libro(s) añadido(s) a Carrito!",
                    duration: 3000,
                    gravity: "top",
                    position: "left",
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
    };
                
    contenedorCarrito.addEventListener('drop', dropLibroZonaCarrito)
    contenedorCarrito.addEventListener('touchend', dropLibroZonaCarrito)

    contenedorCarrito.addEventListener('dragover', (e) => {e.preventDefault();});
    contenedorCarrito.addEventListener('touchmove', (e) => { e.preventDefault()})  
    agregarLibrosZonaCarritodeZonaLectura();
}
    


/*AGREGAR LIBRO A CARRITO DESDE ZONA LECTURA POR BOTON CARRITO ASIGNADO */

const agregarLibrosZonaCarritodeZonaLectura = () => {
  
const carritoComprasZonaLectura = document.querySelectorAll('.zonaLectura__cardsContainer__cardsLibros__div__carritoCompras')
    
    for (const element of carritoComprasZonaLectura) {
        element.addEventListener('click', (e) => {
        const idDinamico = e.target.id
            library.forEach((element) => {
                if (idDinamico === element.book.ISBN)
                
                    if(!seleccionCarrito.find(item => item.book.ISBN === idDinamico))
                               { seleccionCarrito.push(element)
                                localStorage.setItem('seleccionCarrito', JSON.stringify(seleccionCarrito))
                                borrarCardsAnterioresCarrito()
                                displayBooksCarrito() }
            })
        })
    }
    
}


/* EVENTOS ARRASTRE LIBROS A ZONA LECTURA */  
let agregarLibrosSeleccionLectura = () => {
    setTimeout(() => { /* DA TIEMPO AL DESPLIEGUE DINAMICO DEL DOM */
        const coleccionLibros = document.querySelectorAll('.main__section__div__card__img')
        const contenedorDragZonaLectura = document.getElementById('sectionBotonZonaLectura')
        const contenedorDragZonaLecturaDirecto = document.getElementById('zonaLectura--container')

        for (const element of coleccionLibros) {
            element.addEventListener('dragstart', (e) => {
                idDinamicoB = e.target.id + ' B ';
                idDinamicoA = e.target.id;
            });
    
            element.addEventListener('touchstart', (e) => {
                idDinamicoB = e.target.id + ' B ';
                idDinamicoA = e.target.id;
            });  
        }
    
        contenedorDragZonaLecturaDirecto.addEventListener('dragover', (e) => {e.preventDefault();
        });
    
        contenedorDragZonaLecturaDirecto.addEventListener('touchstart', (e) => {
        });
    

        const dropZonaLectura = (e) => {
    
            if (idDinamicoB && idDinamicoA) {
                const elementToAdd = library.find(element => idDinamicoB === element.book.title + ' B ');
    
                if (elementToAdd && !seleccionLectura.some(item => item.book.title === idDinamicoA)) {
                    seleccionLectura.push(elementToAdd);
                    
                    Toastify({
                        text: "¡Libro(s) añadido(s) a Zona de Lectura!",
                        duration: 3000,
                        gravity: "top",
                        position: "left",
                        style: {
                            background: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)"
                        },
                        stopOnFocus: true,
                    }).showToast();
                    
                    localStorage.setItem('seleccionLectura', JSON.stringify(seleccionLectura));
                    
                    borrarCardsAnterioresListaLectura();
                    displayBooksZonaLectura(seleccionLectura);     
                    agregarLibrosZonaCarritodeZonaLectura()           
                    if (seleccionLectura.length > 0) {
                        activarButEliminarZonaLectura();
                    }
                }
            }
    
        idDinamicoB = '';
        idDinamicoA = '';
        };
                    
        contenedorDragZonaLecturaDirecto.addEventListener('drop', dropZonaLectura)
        contenedorDragZonaLecturaDirecto.addEventListener('touchend', dropZonaLectura)
    
        contenedorDragZonaLecturaDirecto.addEventListener('dragover', (e) => {e.preventDefault();});
        contenedorDragZonaLecturaDirecto.addEventListener('touchmove', (e) => { e.preventDefault()})  

        contenedorDragZonaLectura.addEventListener('drop', dropZonaLectura)
        contenedorDragZonaLectura.addEventListener('touchend', dropZonaLectura)
    
        contenedorDragZonaLectura.addEventListener('dragover', (e) => {e.preventDefault();});
        contenedorDragZonaLectura.addEventListener('touchmove', (e) => { e.preventDefault()})  
        
        displayBooksZonaLectura(seleccionLectura);
        agregarLibrosZonaCarritodeZonaLectura()

      
      
     
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


/* FUNCION RESET/BORRADO DE CARDS LIBROS ZONA PRINCIPAL */

let borrarCardsAnteriores = () => {
    const eliminarCards = document.querySelectorAll('.main__section__div')
    eliminarCards.forEach((card) => card.remove())
}


/* FUNCION RESET/BORRADO DE CARDS LIBROS ZONA LECTURA */

let borrarCardsAnterioresListaLectura = () => {
    const eliminarCards = document.querySelectorAll('.zonaLectura__cardsContainer__div')
    eliminarCards.forEach((card) => card.remove())
}

let borrarCardsAnterioresCarrito = () => {
    const eliminarCards = document.querySelectorAll('.carritoCompras__divs')
    eliminarCards.forEach((card) => card.remove())
}



/* RESETA FILTROS DE ZONA PRINCIPAL Y PERMITE VISUALIZAR LA TOTALIDAD DE LOS LIBROS */
const eliminarFiltros = () => {resetFiltros = document.getElementById('filtrosDinamicos')
    resetFiltros.addEventListener('click', (e) => {
        if (e.target.value === 'eliminarFiltros')
            seleccionFiltro = library.map((objetosInternos) => {return objetosInternos}) 
            borrarCardsAnteriores()
            displayBooks(seleccionFiltro) 
           
            agregarLibrosCarritoArrastre() 
    })
}


/*  ELIMINAR SELECCION DE CARRITO EN SU TOTALIDAD  */
const eliminarSeleccionCarritoCompleto = () => {
    let eliminarSeleccionCarrito = document.getElementById('eliminarSeleccionCarrito')
    const comprobarCards = document.querySelectorAll('.carritoCompras__divs')
 
    const eliminarSeleccionCarritoEvento = (e) =>{   
        if(seleccionCarrito.length > 0) {
          Toastify({
                text: "¡Libro(s) eliminado(s) de Zona de Lectura",
                duration: 3000,
                gravity: "top",
                position: "left",
                style: {
                    background: "linear-gradient(147deg, #FFE53B 0%, #FF2525 38%)"},
                stopOnFocus: true,
            }).showToast()
            borrarCardsAnterioresCarrito()
        }else {
            Toastify({
                text: "¡No hay libros en tu Carrito para Eliminar!",
                duration: 3000,
                gravity: "top",
                position: "left",
                style: {
                    background: "linear-gradient(147deg, #FFE53B 0%, #FF2525 38%)"},
                stopOnFocus: true,
            }).showToast()
        }
      

            

        localStorage.setItem('seleccionCarrito', JSON.stringify(seleccionCarrito = []))
        seleccionCarrito = JSON.parse(localStorage.getItem('seleccionCarrito'))
        carritoComprasContadorNumerico.innerText = seleccionCarrito.length  
    /*     desactivarButEliminarZonaLectura() */
    }

    eliminarSeleccionCarrito.addEventListener('click', eliminarSeleccionCarritoEvento)
   /*  eliminarSeleccionCarrito.addEventListener('touchstart', eliminarSeleccionCarritoEvento) */
}



/* ELIMINAR CARDS LIBROS CARRITO INDIVDUAL (BOTON X) */

let eliminarLibrosUnicosCarrito = () => {
    const butElimninarLibroUnico = document.getElementsByClassName('carritoCompras__divs__imgContainer__butEliminar--img')

    for (const element of butElimninarLibroUnico){
    element.addEventListener('click',(e) => { /* CAPTURA ID DINAMICO */
        
        const idDinamico = e.target.id  
        const libroAEliminar = seleccionCarrito.find((element) => element.book.title === idDinamico);
        if (libroAEliminar) {
            Toastify({
                text: "¡Libro(s) eliminado(s) del Carrito",
                duration: 3000,
                gravity: "top",
                position: "left",
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



/* ELIMINAR SELECCION LECTURA COMPLETA */

const eliminarSeleccionLecturaCompleto = () => {
    let eliminarSeleccionLectura = document.getElementById('eliminarSeleccionLectura')
    const eliminarSeleccioLectura  = () =>{
        borrarCardsAnterioresListaLectura()
            if(seleccionLectura.length > 0){ 
            Toastify({
                text: "¡Libro(s) eliminado(s) de Zona de Lectura",
                duration: 3000,
                gravity: "top",
                position: "left",
                style: {
                    background: "linear-gradient(147deg, #FFE53B 0%, #FF2525 38%)"},
                stopOnFocus: true,
            }).showToast()
        }else{ 
            Toastify({
                text: "¡No hay libros en esta seccion para eliminar Carrito!",
                duration: 3000,
                gravity: "top",
                position: "left",
                style: {
                    background: "linear-gradient(147deg, #FFE53B 0%, #FF2525 38%)"},
                stopOnFocus: true,
            }).showToast()
        }
     
        localStorage.setItem('seleccionLectura', JSON.stringify(seleccionLectura = []))
        seleccionLectura = JSON.parse(localStorage.getItem('seleccionLectura'))
        resetDescripcionesZonaLectura()
        desactivarButEliminarZonaLectura()
        actualizarContadorLibrosZonaLectura()
    
    }
    
    eliminarSeleccionLectura.addEventListener('click', eliminarSeleccioLectura)
    eliminarSeleccionLectura.addEventListener('touchstart', eliminarSeleccioLectura)
}


    /* ELIMINAR CARDS LIBROS ZONA LECTURA INDIVDUAL (BOTON X)  */

let eliminarLibrosUnicosZonaLectura = () => {
    const butElimninarLibroUnico = document.getElementsByClassName('zonaLectura__cardsContainer__cardsLibros__div__butEliminar')
    let idDinamico = ''

    for (const element of butElimninarLibroUnico){
    const eliminarLibrosZLecturaIndividual = (e) => { /* CAPTURA ID DINAMICO */
    idDinamico = e.target.id
        if (seleccionLectura.some((element) => element.book.title == idDinamico))
                {{ Toastify({
                    text: "¡Libro(s) eliminado(s) del Carrito",
                    duration: 3000,
                    gravity: "top",
                    position: "left",
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
            }
                 
            element.addEventListener('touchstart', (e) => { eliminarLibrosZLecturaIndividual(e); e.preventDefault(); })
            element.addEventListener('click', eliminarLibrosZLecturaIndividual)
    }
}
  


/* RESET/BORRAR DESCRIPCIONES ZONA LECTURA */
const resetDescripcionesZonaLectura = () => {

    zonaLecturaGenero.innerText = `` 
    zonaLecturaPaginas.innerText = ``
    zonaLecturaSynopsis.innerText = ``
    zonaLecturaAnio.innerText = ``
    zonaLecturaAutor.innerText = ``
    zonaLecturaObras.innerText = ``
    zonaLecturaISBN.innerText = ``
}


/* ALERT CUANDO SE SELECCIONA EL BOTON DE CARRITO PARA CERRAR COMPRA */
const butCerrarCompraCarrito = () => { 
    const carritoComprasCerrarCompra = document.getElementById('butCarritoCerrarCompra') 
    carritoComprasCerrarCompra.addEventListener('click',() => { 
        borrarCardsAnterioresCarrito()
        actualizarContadorLibrosCarrito()
        localStorage.setItem('seleccionCarrito', JSON.stringify(seleccionCarrito = []))
        seleccionCarrito = JSON.parse(localStorage.getItem('seleccionCarrito'))
        carritoComprasContadorNumerico.innerText = seleccionCarrito.length 
        displayBooksCarrito() 
    
    
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Procesando Compra'
          })
    })
    
}


/* FUNCION OBJETO OBSREVADOR PARA CAMBIAR VISUAL RESPONSIVE DEL MENU EN @MEDIA <550px */
const ajusteResponsiveZonaLectura = () => {
    const elementoObservado = document.getElementById('zonaLectura')
    const cambiosEsperados = {attributes: true}

    const observador = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && window.innerWidth <= 550 ) {
                const carrouselContainer = document.getElementById('carrouselContainer')
                    carrouselContainer.classList.add('main__section__carrouselContainer--menuDesplegado')
                    carrouselContainer.classList.remove('main__section__carrouselContainer')
                const main__section = document.getElementById('main__section')
                    main__section.classList.add('main__section--menuDesplegado')
                    main__section.classList.remove('main__section')


                console.log('El elemento observado ha cambiado en algún atributo.');
            }
        }
    });
    observador.observe(elementoObservado, cambiosEsperados);
}


/* FUNCION DE REVERSION PARA CAMBIAR VISUAL RESPONSIVE DEL MENU EN @MEDIA <550px */
const ajusteResponsiveZonaReversion = () => {
    const cierreX = document.getElementById('cierreX')
            if (window.innerWidth <= 550 ) {
                cierreX.addEventListener('click', () => {

                const carrouselContainer = document.getElementById('carrouselContainer')
                    carrouselContainer.classList.remove('main__section__carrouselContainer--menuDesplegado')
                    carrouselContainer.classList.add('main__section__carrouselContainer')
                
                    const main__section = document.getElementById('main__section')
                    main__section.classList.remove('main__section--menuDesplegado')
                    main__section.classList.add('main__section')
            })
  }
}


// Arreglar responsive Menu emergente y largo de pantalla.
// Agregar scroll a carrito para mobile
// Ver funcionalidades que faltan de Mobile para corregir
