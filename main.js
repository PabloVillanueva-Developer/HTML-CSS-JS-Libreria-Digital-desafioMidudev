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




/* REVISION EN LOCAL STORAGE AL CARGAR PAGINA PARA DESPLIEGUE INICIAL CON DATOS GUARDADOS SELECCION LECTURA */
pushSeleccionLecturaVerificaNoRepetido()
/* REVISION EN LOCAL STORAGE AL CARGAR PAGINA PARA DESPLIEGUE INICIAL CON DATOS GUARDADOS CARRITO */
pushSeleccionCarritoVerificaNoRepetido()



/* ASINCRONIA */
/* SOLICITUD INFO A API (.JSON LOCAL) / SIMULADO CON ARCHIVO .JSON ALOJADO EN REPO PUBLICO DE GITHUB*/
const fetchData = async () => {
    try {const response = await fetch('https://raw.githubusercontent.com/PabloVillanueva-Developer/simuladorAPIsRepoJSONs/main/books.json')

        library = await response.json()
                    //EJECUCION DE FUNCIONES DEPENDIENTES DE REQUEST FETCH
        /* DESPLIEGUE INICIAL: CREAR CARDS EN ZONA PRINCIPAL CON EL TOTAL DE LIBROS OBTENIDOS DEL .JSON FETCH */
        displayBooks (library)
        
        /* EJECUCION FUNCION:  CREAR CARDS ZONA PRINCIPAL SEGUN SELECCION FILTRO */
        displayBooks (seleccionFiltro)

        /* EJECUCION FUNCION: CREAR CARDS DE ZONA DE LECTURA*/
        displayBooksZonaLectura(seleccionLectura)

        /* EJECUCION FUNCION: CREAR LIBROS CARRITO COMPRAS */
        displayBooksCarrito(seleccionCarrito)

         /* EJECUCION FUNCION: DISPLAY DE CARDS EN SECTION PRINCIPAL SEGUN SELECCION DE FILTRO */
        displayCardsSegunFilto()
        
        /* EJECUCION FUNCION: ACTIVAR BOTON CESTA LECTURA */
        activarButEliminarZonaLectura()

        /* EJECUCION FUNCION: DESACTIVAR BOTON CESTA LECTURA */
        desactivarButEliminarZonaLectura()

        /* EJECUCION FUNCION: LOGICA DE ACCIONES PARA EVENTOS CLICK Y MOUSE AL SOLTAR EN SELECCION LECTURA   */
        dropZonaLectura() 

        /* EJECUCION FUNCION: AGREGAR LIBROS A CARRITO POR CLICK Y MOUSE */
        agregarLibrosCarritoArrastre()

        /* EJECUCION FUNCION: AGREGAR LIBRO A CARRITO DESDE ZONA LECTURA POR BOTON CARRITO ASIGNADO */
        agregarLibrosZonaCarritodeZonaLectura()

        /* EJECUCUIN FUNCION: EVENTOS ARRASTRE LIBROS A ZONA LECTURA */
        agregarLibrosSeleccionLectura()

        /* EJECUCION FUNCION: CONTADOR ELEMENTOS EN CARRITO */
        actualizarContadorLibrosCarrito()

        /* EJECUCION FUNCION: CONTADOR ELEMENTOS EN ZONA LECTURA */
        actualizarContadorLibrosZonaLectura()

        /* EJECUCION FUNCION: RESET/BORRADO DE CARDS LIBROS ZONA LECTURA */
        borrarCardsAnterioresListaLectura()

        /* EJECUCION FUNCION: RESET/BORRADO DE CARDS LIBROS CARRITO */
       /*  borrarCardsAnterioresCarrito() */
    
        /* EJECUCION FUNCION: RESETA FILTROS DE ZONA PRINCIPAL Y PERMITE VISUALIZAR LA TOTALIDAD DE LOS LIBROS  */
        eliminarFiltros()

        /* EJECUCION FUNCION: ELIMINAR SELECCION DE CARRITO EN SU TOTALIDAD */
        eliminarSeleccionCarritoCompleto()

         /* EJECUCION FUNCION: ELIMINAR CARDS LIBROS CARRITO INDIVDUAL (BOTON X) */
        eliminarLibrosUnicosCarrito()

         /* EJECUCION FUNCION: ELIMINAR SELECCION DE LECTURA EN SU TOTALIDAD */
         eliminarSeleccionLecturaCompleto()

        /* EJECUCION FUNCION: ELIMINAR CARDS LIBROS ZONA LECTURA INDIVDUAL (BOTON X) */
        eliminarLibrosUnicosZonaLectura()

        /* EJECUCION FUNCION: RESET/BORRAR DESCRIPCIONES ZONA LECTURA */
         resetDescripcionesZonaLectura()

        /* EJECUCION FUNCION: ALERT CUANDO SE SELECCIONA EL BOTON DE CARRITO PARA CERRAR COMPRA   */
        butCerrarCompraCarrito()

        /* EJECUCION FUNCION: FUNCION PARA CAMBIAR VISUAL RESPONSIVE DEL MENU EN @MEDIA <550px   */
        ajusteResponsiveZonaLectura()
        /* FUNCION DE REVERSION PARA CAMBIAR VISUAL RESPONSIVE DEL MENU EN @MEDIA <550px */
        ajusteResponsiveZonaReversion()

    
    }

    catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}
/* EJECUCION FETCH SOLICITUD .JSON CATALOGO LIBROS */
fetchData()



/* SINCRONIA / FUNCIONALIDADES NO DEPENDIENTES DE FETCH */

 /* EJECUCION FUNCION: RESET/BORRADO DE CARDS LIBROS ZONA PRINCIPAL */
 borrarCardsAnteriores()

/* DESPLIEGUE DE ZONA DE LECTURA */

    let abrirZonaLectura = document.getElementById('botonAbrirZonaLectura') /* APERTURA ZONA LECTURA DESDE MENU HEADER */
    let contenedorDragZonaLectura = document.getElementById('sectionBotonZonaLectura') /* APERTURA ZONA LECTURA DESDE BOTON GRANDE*/
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

    

/* GENERACION DESCRIPCIONES INFO DINAMICA DE LIBROS ZONA LECTURA */
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
const mensajeComoOperar = "Utiliza los filtros para acotar tu busqueada. \nPuedes arrastrar los libros a la Zona de lectura en el contenedor con la silueta de lectura o puedes seleccionar Zona de Lectura en el menu principal y arrastrar tus libros alli.\nPuedes arrastra al carrito los libros que te interesen.\nEn la version para celularas, en lugar de arrastra un libro debers hacer touch sobre el y luego touch sobre el contenedor donde lo quieras incluir."
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
    



