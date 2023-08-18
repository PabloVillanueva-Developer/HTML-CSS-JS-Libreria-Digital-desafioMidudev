let library = []
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


/* SOLICITUD INFO A API (.JSON LOCAL) */

pushSeleccionLecturaVerificaNoRepetido()

pushSeleccionCarritoVerificaNoRepetido()

const fetchData = async () => {
try {const response = await fetch('https://raw.githubusercontent.com/PabloVillanueva-Developer/simuladorAPIsRepoJSONs/main/books.json')




    library = await response.json()
   /* EJECUCION INICIAL DE CARDS EN BASE A ARRAY LIBRARY ORIGINAL */
    displayBooks (library)
/* EJECUCION INICIAL DE CARDS EN BASE A ARRAY LIBRARY ORIGINAL */
    displayBooks (seleccionFiltro)

/* EJECUCION DE FUNCION QUE AGREGA LIBROS AL CARRITO */
agregarLibrosCarritoArrastre()
 

/* EJECUCION INICIAL DE ENVIO LIBROS DE ZONA LECTURA A CARRITO */
agregarLibrosZonaCarritodeZonaLectura()

agregarLibrosSeleccionLectura()

displayCardsSegunFilto()

eliminarFiltros()

eliminarSeleccionCarritoCompleto()

eliminarSeleccionLecturaCompleto()

eliminarLibrosUnicosCarrito()

eliminarLibrosUnicosZonaLectura()

borrarCardsAnterioresCarrito()

borrarCardsAnterioresListaLectura()

displayBooksCarrito()

displayBooksZonaLectura()

butCerrarCompraCarrito()









}

catch (error) {
    console.error('Error al cargar los datos:', error);
  }

}
fetchData()



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

/* ALERT CON EXPLICACION DE FUNCIONAMIENTO DEL SITIO */
const comoOperar = document.getElementById('comoOperar')
const mensajeComoOperar = "Utiliza los filtros para acotar tu busqueada. \nPuedes arrastrar los libros a la Zona de lectura en el contenedor circular o directamente en la Zona de Lectura desplegada.\nSi clickeas en Zona Lectura en el menu superior o si clickeas sobre el circulo de lectura, podras desplegar la Zona de Lectura \nPuedes arrastra al carrito los libros que te interesen."
    comoOperar.addEventListener('click',() => {
        Toastify({
            text: mensajeComoOperar,
            duration: 6000,
            gravity: "top",
            style: {
                background: "linear-gradient(147deg, #039BE5 0%, #8E24AA 38%)"},
            stopOnFocus: true,
        }).showToast()


    }
    )

 

