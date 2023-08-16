let genre = ''
const generosUnicos = []
let generosFiltro = ''
let ejecutarFiltro = ''
let resetFiltros = ''
let seleccionFiltro =  library.map((objetosInternos) => {return objetosInternos;}); /* COPIA DEL ARRAY.JSON PARA HACERLO MAS DINAMICO */
let contadorLibros = ''
let contadorPosiciones = 0
let seleccionLectura = []
let seleccionCarrito = []



/* EJECUCION INICIAL DE CARDS EN BASE A ARRAY LIBRARY ORIGINAL */
displayBooks (seleccionFiltro)

/* EJECUCION DE FUNCION QUE AGREGA LIBROS AL CARRITO */
agregarLibrosCarritoArrastre()

/* EJECUCION INICIAL DE ENVIO LIBROS DE ZONA LECTURA A CARRITO */
agregarLibrosZonaCarritodeZonaLectura()




/* DISPLAY DE CARDS EN SECTION PRINCIPAL SEGUN SELECCION DE FILTRO */
ejecutarFiltro = document.getElementById('filtrosDinamicos')
    ejecutarFiltro.addEventListener('click', (e) => {
        /* CREACION DE ARRAY CON SELECCION = seleccionFiltro */
        seleccionFiltro = [] /* RESET DEL ARRAY PARA CADA CLICK INDIVIDUAL */
        seleccionFiltro = library.filter((objeto) => e.target.value === objeto.book.genre)
   
        borrarCardsAnteriores ()
        displayBooks(seleccionFiltro)
        agregarLibrosCarritoArrastre()
     
      
    
    }) 

    /* ARREGLAR FILTROS */


/* ELIMINAR FILTROS/MOSTRAR TODOS LOS LIBROS ZONA PRINCIPAL*/
resetFiltros = document.getElementById('filtrosDinamicos')

    resetFiltros.addEventListener('click', (e) => {
     
        if (e.target.value === 'eliminarFiltros')
        seleccionFiltro = library.map((objetosInternos) => {return objetosInternos}) 
        borrarCardsAnteriores ()
        displayBooks(seleccionFiltro) 
        agregarLibrosSeleccionLectura()  
        
      
    })




/* DESPLIEGUE DE ZONA DE LECTURA */

    let abrirZonaLectura = document.getElementById('botonAbrirZonaLectura') /* APERTURA ZONA LECTURA DESDE MENU HEADER */
    let contenedorDragZonaLectura = document.getElementById('contenedorDragZonaLectura') /* APERTURA ZONA LECTURA DESDE BOTON GRANDE*/
    let sectionZonaLectura = document.getElementById('zonaLectura') /* ELEMENTO DEL DOM QUE SE MODIFICA */
    let botonCierreXSection = document.getElementById('cierreX') /* BOTON DESACTIVA EVENTO */

    abrirZonaLectura.addEventListener('click', () => {
        if(sectionZonaLectura.classList.contains('zonaLectura--hidden'))
            {sectionZonaLectura.classList.remove('zonaLectura--hidden'),
            sectionZonaLectura.classList.add('zonaLectura--desplegado')} 
        else {sectionZonaLectura.classList.add('zonaLectura--hidden'),
            sectionZonaLectura.classList.remove('zonaLectura--desplegado')} 
        
    })

    contenedorDragZonaLectura.addEventListener('click', () => {
        if(sectionZonaLectura.classList.contains('zonaLectura--hidden'))
            {sectionZonaLectura.classList.remove('zonaLectura--hidden'),
            sectionZonaLectura.classList.add('zonaLectura--desplegado')}
        else { sectionZonaLectura.classList.remove('zonaLectura--desplegado'),
        sectionZonaLectura.classList.add('zonaLectura--hidden')}
    })

    botonCierreXSection.addEventListener('click', () => { 
        sectionZonaLectura.classList.remove('zonaLectura--desplegado')
        sectionZonaLectura.classList.add('zonaLectura--hidden')
    })

    contenedorDragZonaLectura.addEventListener('drop', () => {
        sectionZonaLectura.classList.remove('zonaLectura--hidden')
        sectionZonaLectura.classList.add('zonaLectura--desplegado')
    })

    

    

    



/* AGREGAR LIBROS AL ARRAY seleccionLectura / Compara si no esta agregado, lo sube*/


/* Revision seleccionLectura en localStorage al cargar pagina*/
document.addEventListener('DOMContentLoaded', () => {
    
   
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


/* AGREGAR LIBROS AL ARRAY seleccionCarrito / Compara si no esta agregado, lo sube*/

/* Revision Carrito en localStorage al cargar pagina*/
document.addEventListener('DOMContentLoaded', () => {
    seleccionCarrito = JSON.parse(localStorage.getItem('seleccionCarrito'))
    if(seleccionCarrito === null) {seleccionCarrito = []} /* MANEJA ERROR SI NO ENCUENTRA ARCHIVO EN LOCAL*/
    if(seleccionCarrito)
        displayBooksCarrito()
 
      
   
      
})




/* GENERACION INFO DINAMICA DE LIBROS ZONA LECTURA */
const zonaLecturaGenero = document.getElementById('zonaLecturaGenero')
const zonaLecturaPaginas = document.getElementById('zonaLecturaPaginas')
const zonaLecturaSynopsis = document.getElementById('zonaLecturaSynopsis')
const zonaLecturaAnio = document.getElementById('zonaLecturaAnio')
const zonaLecturaAutor = document.getElementById('zonaLecturaAutor')
const zonaLecturaObras = document.getElementById('zonaLecturaObras')
const zonaLecturaISBN = document.getElementById('zonaLecturaISBN')
const infoLibrosDinamica = document.getElementsByClassName('zonaLecturaCards__Container__flex')


for (const coleccionHTML of infoLibrosDinamica) {
    coleccionHTML.addEventListener('mouseover', (e) => {
        let nombreLibro = e.target.id
        for (const element of library) {
            if (nombreLibro === element.book.title) {
                zonaLecturaGenero.innerText = `${element.book.title}` 
                zonaLecturaPaginas.innerText = `${element.book.pages}`
                zonaLecturaSynopsis.innerText = `${element.book.synopsis}`
                zonaLecturaAnio.innerText = `${element.book.year}`
                zonaLecturaAutor.innerText = `${element.book.author.name}`
                zonaLecturaObras.innerText = `${element.book.author.otherBooks}`
                zonaLecturaISBN.innerText = `${element.book.ISBN}`
            }
        }
    })  
}



/* ELIMINAR SELECCION LECTURA COMPLETA */
let eliminarSeleccionLectura = document.getElementById('eliminarSeleccionLectura')

eliminarSeleccionLectura.addEventListener('click', () =>{
    borrarCardsAnterioresListaLectura()
    localStorage.setItem('seleccionLectura', JSON.stringify(seleccionLectura = []))
    seleccionLectura = JSON.parse(localStorage.getItem('seleccionLectura'))
    resetDescripcionesZonaLectura()
    desactivarButEliminarZonaLectura()
    actualizarContadorLibrosZonaLectura()

})


/* ELIMINAR SELECCION CARRITO COMPLETA */
let eliminarSeleccionCarrito = document.getElementById('eliminarSeleccionCarrito')


eliminarSeleccionCarrito.addEventListener('click', (e) =>{
    
    borrarCardsAnterioresCarrito()
    localStorage.setItem('seleccionCarrito', JSON.stringify(seleccionCarrito = []))
    seleccionCarrito = JSON.parse(localStorage.getItem('seleccionCarrito'))
    carritoComprasContadorNumerico.innerText = seleccionCarrito.length  
/*     desactivarButEliminarZonaLectura() */

})






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
                    /* ARRASTRE A CONTENEDOR DE ENVIO PARA ZONA LECTURA */
            contenedorDragZonaLectura.addEventListener ('drop', dropZonaLectura) 
            
            contenedorDragZonaLectura.addEventListener ('dragover', (e) => {
                e.preventDefault();
            }) 



                /* ARRASTRE DIRECTO A ZONA LECTURA */
            contenedorDragZonaLecturaDirecto.addEventListener ('drop', dropZonaLectura) 

            contenedorDragZonaLecturaDirecto.addEventListener ('dragover', (e) => {
                e.preventDefault();
            }) 

            


        }   
    }, 1);
}
    








const agrandarImagenes = document.querySelectorAll('.main__section__div')
for (const element of agrandarImagenes) {
    
element.addEventListener('click', (e) => {
const id = e.target.id
/* YA TENGO CAPTURADO EL TARGET ID DE LAS IMAGENES/ME FALTA LOGRAR QUE LUEGO SE AGRANDEN PARA QUE SE VEAN BIEN */
})
}
