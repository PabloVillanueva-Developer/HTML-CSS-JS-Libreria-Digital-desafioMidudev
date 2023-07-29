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

/* DISPLAY DE CARDS SEGUN SELECCION DE FILTRO */
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
    }) 

/* ELIMINAR FILTROS/MOSTRAR TODOS LOS LIBROS*/
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
    })






    











