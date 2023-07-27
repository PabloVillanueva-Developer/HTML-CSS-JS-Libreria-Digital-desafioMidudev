
let genre = ''
const generosUnicos = []
let generosFiltro = ''
let ejecutarFiltro = ''
let resetFiltros = ''


/* EJECUCION INICIAL DE CARDS EN BASE A ARRAY LIBRARY ORIGINAL */
displayBooks (library)


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
        let seleccionFiltro = [];
        seleccionFiltro = [] /* RESET DEL ARRAY PARA CADA CLICK INDIVIDUAL */
        seleccionFiltro = library.filter((objeto) => e.target.id === objeto.book.genre)
        borrarCardsAnteriores ()
        displayBooks(seleccionFiltro)
        } 
    ) 

/* RESET DE CARDS AL ELIMINAR FILTROS */
resetFiltros = document.getElementById('eliminarFiltros')
    resetFiltros.addEventListener('click', () => {
        borrarCardsAnteriores ()
        displayBooks (library)
    })


/* ZONA LECTURA EMERGENTE */
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
/* HACERLO RESPONSIVE */
