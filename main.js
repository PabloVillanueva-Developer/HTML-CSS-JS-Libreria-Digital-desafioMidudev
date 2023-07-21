const containerCatalogo = document.getElementById('main__section');


    
for (const iterator of library) {

    const cards = document.createElement('div')
    cards.classList.add('main__section__div')
    cards.innerHTML = `
        <div class="main__section__div__card">
            <ul class="main__section__div__card__back"> 
                <li>Genero: ${iterator.book.genre}</li>
                <li>Paginas: ${iterator.book.pages}</li>
                <li>Año: ${iterator.book.year}</li>
                <li>Autor: ${iterator.book.author.name}</li>
            </ul>

            <div class="main__section__div__card__button">
                <a href="#" class="main__section__div__card__button__a">Agrega a Lista de Lectura</a>
            </div>
            
            <img class="main__section__div__card__img" src="${iterator.book.cover}" alt="">
        </div>

        <ul class="main__section__div__card__data">
            <li class="main__section__div__card__data__li">${iterator.book.title}</li>
            <li>${iterator.book.ISBN}</li>
        </ul>
    `

    containerCatalogo.appendChild(cards);
    

}
console.log (library)


const botonAbrirZonaLectura = document.getElementById('botonAbrirZonaLectura')
const zonaLectura = document.getElementById('zonaLectura')
botonAbrirZonaLectura.addEventListener('click', evento => {
    zonaLectura.classList.add('main__section--zonaLectura--visible')
    zonaLectura.classList.remove('main__section--zonaLectura')
})



/* VER SI PUEDO HACER LEER LOS DATOS DIRECTOS DE UN .JSON */
/* ACOMODAR LA ESTETICA DE LA WEB PARA QUE LAS TARJETAS SE VEAN BIEN, HAY ALGO CON LA DEFINICION DE LAS ALTURAS ME PARECE */
/* SEGUIR AVANZANDO CON LAS CONSIGNAS */