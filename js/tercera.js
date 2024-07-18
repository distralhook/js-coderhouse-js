/*TERCERA ENTREGA

Juego de la memoria

Dado una serie de cartas (siempre cantidad par) que estan boca abajo, el usuario tiene que ir volteando de a dos.
Cada carta tiene un simbolo o numero, entonces el usuario debe voltear dos cartas con el mismo simbolo o valor. 

Si el usuario voltea dos que son diferentes, las cartas se muestran por un breve periodo de tiempo y vuelven a voltearse
(mostrando el dorso). Pero si el usuario voltea dos iguales, entonces estas quedan boca arriba y el usuario continua
con el resto de las cartas.*/



const cardsEasy = ["1","1","2","2","3","3","4","4"]
/* 8 cards 2*6 maybe 4*4 */
const cardsMedium = ["1","1","2","2","3","3","4","4","5","5","6","6","7","7","8","8",]
/*16 cards 4*6 */
const cardsHard = ["1","1","2","2","3","3","4","4","5","5","6","6","7","7","8","8","9","9","10","10","11","11","12","12"]
/*24 cards 6*6 */

/*Pude haberlo hecho para que dependiendo la dificultad solo lea hasta cierto numero pero esto es mas rapido y facil.
para la ultima entrega voy a ver de hacerlo mas eficiente en espacio.*/

let cards = []; /*lector de cartas y lugar donde se encuentran las respuestas*/

function mesclar(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let moves;
function jugar(dificultad){

    sessionStorage.setItem("cantMoves",dificultad);

    document.getElementById("best").style.display = "none"; //esconder por si salio sin escribir para evitar errores
    moves=0;
    document.getElementById("moves").textContent = moves; /*Sobreescribir anterior moves*/

    switch(dificultad){
        case 4:/*FACIL*/
            cards=cardsEasy;
            console.log("easy with 4 pairs of cards");
            break;
        case 8:/*MEDIANO*/
            cards=cardsMedium;
            console.log("medium with 8 pairs of cards");
            break;
        default:/*12 DIFICIL*/
            cards=cardsHard;
            console.log("hard with 12 pairs of cards");
            break;
    }

    mesclar(cards);
    
    console.log("machete de ubicaciones: ", cards);
    

    const cartasLista = document.getElementById("cartas");
    cartasLista.innerHTML = ""; /*limpiar el juego anterior*/
    let index = 0;

    cards.forEach(cardValue => {
        let img = document.createElement("img");
        img.src = `../images/backCard.png`;
        img.setAttribute('id', index);
        img.addEventListener("click", turnCard);
        index++;
        cartasLista.appendChild(img);
    });
}

let lockScreen = false;
let firstCard, secondCard = null;


function turnCard(event){
    if(lockScreen==true){
        return; /*can't play yet*/
    }
    const card = event.target;

    if(card===firstCard){
        return; /*don't click the same one dummy*/
    }

    card.src = `../images/${cards[card.id]}.png`;

    if (!firstCard) {
        firstCard = card; /*girst card selected*/
    } else {
        secondCard = card; /*second card selected*/
        lockScreen = true;
        moves++;
        document.getElementById('moves').textContent = moves;
        igualdad();
    }
}

function igualdad() {
    const isMatch = cards[firstCard.id] === cards[secondCard.id];
    isMatch ? correcto() : equivocado();
}

let cantiMovi;

function correcto() {  /*Carta correcta*/
    firstCard.removeEventListener('click', turnCard);
    secondCard.removeEventListener('click', turnCard);

    cantiMovi = sessionStorage.getItem("cantMoves");
    sessionStorage.clear()
    cantiMovi--
    sessionStorage.setItem("cantMoves",cantiMovi)

    continuar();
}

function equivocado() { /*Carta equivocada*/
    setTimeout(() => {
        firstCard.src = `../images/backCard.png`;
        secondCard.src = `../images/backCard.png`;
        continuar();
    }, 1000);
}

function continuar() {/*Siguiente movimiento*/
    firstCard = null;
    secondCard = null;
    lockScreen = false;

    cantiMovi = sessionStorage.getItem("cantMoves");
    console.log(cantiMovi)
    if(cantiMovi==0){//finish
        document.getElementById("best").style.display = "flex";
    }
}

let ganadores=0; //SIEMPRE VA A BORRAR LOS ANTERIORES GANADORES CADA VEZ QUE ABRA DE NUEVO LA PAGINA. No se como arreglar esto.

let formulario = document.querySelector('form')

formulario.addEventListener('submit', (evento)=> {
    evento.preventDefault()
    
    let nombre = formulario.querySelector('#nombre').value

    ganadores++;
    console.log(ganadores)
    localStorage.setItem(`ganador${ganadores}`,nombre)
    console.log(nombre)
    document.getElementById("best").style.display = "none";
})

/*
Cosas para agregar para la ultima entrega:
-Arreglar sala de la fama (Local storage)
-mejor jugador para diferentes dificultades/tiempos(local storage)
-animaciones (css)
-temporizador (libreria luxon)
-sonidos (victoria, eleccion correcta y erronea)
-boton para ver los mejores tiempos y movimientos
-???
*/