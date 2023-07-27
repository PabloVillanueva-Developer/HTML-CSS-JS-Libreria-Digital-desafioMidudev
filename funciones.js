
/* FUNCION GENERADORA DE CARDS */

let displayBooks = (array) => {
    const containerCatalogo = document.getElementById('main__section__carrouselContainer');
    for (const iterator of array) {
    
        const cards = document.createElement('div')
        cards.classList.add('main__section__div')
        cards.innerHTML = `
            <div id='${iterator.book.genre}' class="main__section__div__card">
            
                <ul class="main__section__div__card__back"> 
                    <li>Genero: ${iterator.book.genre}</li>
                    <li>Paginas: ${iterator.book.pages}</li>
                    <li>Año: ${iterator.book.year}</li>
                    <li>Autor: ${iterator.book.author.name}</li>
                </ul>
    
                <div class="main__section__div__card__button">
                    <a href="#" class="main__section__div__card__button__a">Agregar a Lista de Lectura</a>
                </div>
                
                <img class="main__section__div__card__img" src="${iterator.book.cover}" alt="">
                
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


