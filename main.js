let genre = ''
const generosUnicos = []
let generosFiltro = ''
let ejecutarFiltro = ''
let resetFiltros = ''
let seleccionFiltro =  library.map((objetosInternos) => {return objetosInternos;}); /* COPIA DEL ARRAY.JSON PARA HACERLO MAS DINAMICO */
let contadorLibros = ''
let contadorPosiciones = 0
const carrouselContainer = document.getElementById('carrouselContainer')
const carrouselButtonIzq = document.getElementById('carrouselButtonIzq')
const carrouselButtonDer = document.getElementById('carrouselButtonDer')
let seleccionLectura = []



/* EJECUCION INICIAL DE CARDS EN BASE A ARRAY LIBRARY ORIGINAL */
displayBooks (seleccionFiltro)
  if (seleccionFiltro.length > 5)
        {activacionCarrousel() }



/* GENERACION DE FILTROS POR GENERO DINAMICOS (VERIFICA QUE SOLO HAYA UNO POR TIPO) */
for (const iterator of library) {
    genre = iterator.book.genre
    if(!generosUnicos.includes(genre) )
        generosUnicos.push(genre)
}



/* FILTRO DINAMICO: SE AGREGAN FILTROS AL DOM SEGUN LOS GENEROS ENCONTRADOS EN BASE DE DATOS */
generosFiltro = document.getElementById('filtrosDinamicos');
    for (const iterator of generosUnicos) {
        const filtrosDisponibles = document.createElement('a');
        filtrosDisponibles.setAttribute('id', `${iterator}`)
        filtrosDisponibles.setAttribute('class', 'header__sectionFilter__ul__div__a')
        filtrosDisponibles.setAttribute('href', `#`)
        filtrosDisponibles.textContent = `${iterator}`
        generosFiltro.appendChild(filtrosDisponibles);
    }



/* DISPLAY DE CARDS EN SECTION PRINCIPAL SEGUN SELECCION DE FILTRO */
ejecutarFiltro = document.getElementById('filtrosDinamicos')
    ejecutarFiltro.addEventListener('click', (e) => {
        /* CREACION DE ARRAY CON SELECCION = seleccionFiltro */
        seleccionFiltro = [] /* RESET DEL ARRAY PARA CADA CLICK INDIVIDUAL */
        seleccionFiltro = library.filter((objeto) => e.target.id === objeto.book.genre)
        borrarCardsAnteriores ()
        resetPosicionCarrousel()
        contadorPosiciones = 0
      
        displayBooks(seleccionFiltro)
            if(seleccionFiltro.length >= 1 && seleccionFiltro.length <= 5) 
                {carrouselContainer.style.justifyContent = 'center'; desactivacionCarrousel()} 
            if (seleccionFiltro.length >5)
                 { carrouselContainer.style.justifyContent = 'start'; activacionCarrousel(); } 
         agregarLibrosSeleccionLectura()
    }) 



/* ELIMINAR FILTROS/MOSTRAR TODOS LOS LIBROS ZONA PRINCIPAL*/
resetFiltros = document.getElementById('eliminarFiltros')
    resetFiltros.addEventListener('click', () => {
        borrarCardsAnteriores ()
        resetPosicionCarrousel()
        
        {
        seleccionFiltro = library.map((objetosInternos) => {return objetosInternos}) // Restauramos seleccionFiltro con el total de los libros
        contadorPosiciones = 0 /* RESET DE POSICIONES */
        if(seleccionFiltro.length >= 1 && seleccionFiltro.length <= 4) 
            {carrouselContainer.style.justifyContent = 'center'} // ALINEACION DE CARDS SEGUN CANTIDAD VISIBLE
        else {carrouselContainer.style.justifyContent = 'start'} // ALINEACION DE CARDS SEGUN CANTIDAD VISIBLE
        }
        
        displayBooks (seleccionFiltro)
        if (seleccionFiltro.length > 5)
        activacionCarrousel() 
        agregarLibrosSeleccionLectura()

    })



/* DESPLIEGUE DE ZONA DE LECTURA */

    let abrirZonaLectura = document.getElementById('botonAbrirZonaLectura') /* BOTON ACTIVA EVENTO */
    let sectionZonaLectura = document.getElementById('zonaLectura') /* ELEMENTO DEL DOM QUE SE MODIFICA */
    let botonCierreXSection = document.getElementById('cierreX') /* BOTON DESACTIVA EVENTO */

    abrirZonaLectura.addEventListener('click', () => {
        sectionZonaLectura.classList.remove('zonaLectura--hidden')
        sectionZonaLectura.classList.add('zonaLectura--desplegado')
    })

    botonCierreXSection.addEventListener('click', () => { 
        sectionZonaLectura.classList.remove('zonaLectura--desplegado')
        sectionZonaLectura.classList.add('zonaLectura--hidden')
    })



/* AGREGAR LIBROS AL ARRAY seleccionLectura / Compara si no esta agregado, lo sube*/
const listaLecturaButtons = document.getElementsByClassName('main__section__div__card__img--botonAgregarLibro')



/* Revision seleccionLectura en localStorage al cargar pagina*/
document.addEventListener('DOMContentLoaded', () => {
    seleccionLectura = JSON.parse(localStorage.getItem('seleccionLectura'))
    if(seleccionLectura)
        displayBooksZonaLectura(seleccionLectura)
        
        /* seleccionLectura =[] */
    agregarLibrosSeleccionLectura()
})



/* GENERACION INFO DINAMICA DE LIBROS */
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
    borrarCardsAnterioresListaLectura(seleccionLectura)
    localStorage.setItem('seleccionLectura', JSON.stringify(seleccionLectura = []))
    seleccionLectura = JSON.parse(localStorage.getItem('seleccionLectura'))
})




   


  
  
  












//PROYECTO
   
    // 4) Arreglar que con los filtros no se suman libros a la seleccionLectura
    // 5) Mejorar estetica general (como las flechitas del carrousel) + Responsive
    // 6) Armar .md file con documentacion general
    // 7) Ver de poner limite al maximo de libros en zonaLectura   
    // 8 Agregar Sweet Alert para permitir no mas de x cantidad de libros en el array de libros.
    // 9) Agregar filtos buscadores
    // 9) Agregar section carrito de Compras



  











