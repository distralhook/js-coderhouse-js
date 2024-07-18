//LIBRERIA USADA: https://animate.style/

/*CUARTA ENTREGA

Juego de la memoria

Dado una serie de cartas (siempre cantidad par) que estan boca abajo, el usuario tiene que ir volteando de a dos.
Cada carta tiene un simbolo o numero, entonces el usuario debe voltear dos cartas con el mismo simbolo o valor. 

Si el usuario voltea dos que son diferentes, las cartas se muestran por un breve periodo de tiempo y vuelven a voltearse
(mostrando el dorso). Pero si el usuario voltea dos iguales, entonces estas quedan boca arriba y el usuario continua
con el resto de las cartas.*/


//originalmente no iba a inicializar el top3 pero no estoy acostumbrado a programar en weak typing. voy a ponerme a practicar con arreglos despues de entregar este proyecto
let lista4 = [
    { winner: "leo", winMoves: 987654321 },
    { winner: "lea", winMoves: 987654322 },
    { winner: "lean", winMoves: 987654323 }
    ];
let lista8 = [
    { winner: "le", winMoves: 987654321 },
    { winner: "an", winMoves: 987654322 },
    { winner: "dro", winMoves: 987654323 }
];
let lista12 = [
    { winner: "evandro", winMoves: 987654321 },
    { winner: "leonardo", winMoves: 987654322 },
    { winner: "lisandro", winMoves: 987654323 }
];

//Establecer records; por si estan...
if(localStorage.getItem('flag') !== null){
    console.log('no es la primera vez jugando.');
} else {//... o no.
    console.log('primera vez jugando.');
    localStorage.setItem('flag', true);
    localStorage.setItem('lista4', JSON.stringify(lista4));
    localStorage.setItem('lista8', JSON.stringify(lista8));
    localStorage.setItem('lista12', JSON.stringify(lista12));
}

class Person { // ME AYUDA A TENER UNA IDEA CON LO QUE TRABAJO
    constructor(winner, winMoves) {
        this.winner = winner;
        this.winMoves = parseInt(winMoves);
    }
}

const actualizarTop = (rankData, resultados) => {
    const rankList = document.getElementById(rankData);
    
    // limpio
    rankList.innerHTML = '';
    
    resultados.forEach((wacho, aux) => {
        const listItem = document.createElement('ul');
        listItem.className = 'rank';
        listItem.innerHTML = `${aux + 1}. <span class="ganador">${wacho.winner}</span> - <span class="movimientos">${wacho.winMoves}</span>`;
        rankList.appendChild(listItem);
    });
};

actualizarTop('facil', JSON.parse(localStorage.getItem("lista4")));
actualizarTop('mediano', JSON.parse(localStorage.getItem("lista8")));
actualizarTop('dificil', JSON.parse(localStorage.getItem("lista12")));

const cardsEasy = ["1","1","2","2","3","3","4","4"]
/* 8 cards 4 pares */
const cardsMedium = ["1","1","2","2","3","3","4","4","5","5","6","6","7","7","8","8",]
/*16 cards 8 pares */
const cardsHard = ["1","1","2","2","3","3","4","4","5","5","6","6","7","7","8","8","9","9","10","10","11","11","12","12"]
/*24 cards 12 pares*/

let cards = []; /*lector de cartas y lugar donde se encuentran las respuestas*/

function mesclar(array){ //RANDOMIZAR EL MAZO
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function pokerng(){ // NO TENIA GANAS DE PENSAR COMO MODIFICAR LA FUNCION ANTERIOR PARA QUE FUNCIONE PARA AMBOS.
    const int = Math.floor((Math.random()*1025)+1); //https://pokeapi.co/ hay 1025 pokemones maximo el dia en que subi este proyecto
    return int;
}

let moves;

function jugar(dificultad){ //INICIALIZAR JUEGO
    sessionStorage.setItem("cantMoves",dificultad);
    sessionStorage.setItem("tipoDificultad",dificultad);

    document.getElementById("best").style.display = "none";
    document.getElementById("notBest").style.display = "none"; //esconder por si salio sin escribir para evitar errores
    moves=0;
    document.getElementById("moves").textContent = moves; /*Sobreescribir anterior moves*/

    switch(dificultad){ //Originalmente, en mi mente, se suponia que pasaba el numero para no tener que inicializar nuevamente la cantidad de pares, por eso usa numeros y no strings con el tipo de dificultad
        case 4:/*FACIL CON 4 PARES DE CARTAS*/
            cards=cardsEasy;
            console.log("easy with 4 pairs of cards");
            break;
        case 8:/*MEDIANO CON 8 PARES DE CARTAS*/
            cards=cardsMedium;
            console.log("medium with 8 pairs of cards");
            break;
        default:/*12 DIFICIL CON 12 PARES DE CARTAS*/
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
        img.setAttribute('class', "animate__animated animate__jackInTheBox");
        img.src = `../images/backCard.png`;
        
        img.setAttribute('id', index);
        img.addEventListener("click", turnCard);
        index++;
        cartasLista.appendChild(img);
    });
}

let lockScreen = false;
let firstCard, secondCard = null;

function turnCard(event){ ///DONE //QUE SUCEDE CUANDO EL USUARIO TOCA UNA CARTA
    if(lockScreen==true){
        return; /*can't play yet*/
    }
    const card = event.target;

    if(card===firstCard){
        return; /*don't click the same one dummy*/
    }
    card.setAttribute('class', "animate__animated animate__flipOutY");//salida animada
    setTimeout(() => {//entrada animada con cambio de carta
        card.src = `../images/${cards[card.id]}.png`;
        card.setAttribute('class', "animate__animated animate__flipInY");
    }, 400);

    if (!firstCard) {
        firstCard = card; /*first card selected*/
    } else {
        secondCard = card; /*second card selected*/
        lockScreen = true;
        moves++;
        document.getElementById('moves').textContent = moves;
        igualdad();
    }
}

function igualdad() { ///DONE
    const isMatch = cards[firstCard.id] === cards[secondCard.id];
    isMatch ? correcto() : equivocado();
}

let cantiMovi;

function correcto() { ///DONE  /*Carta correcta -1 a la cantidad de pares a juntar*/
    firstCard.removeEventListener('click', turnCard);
    secondCard.removeEventListener('click', turnCard);

    cantiMovi = sessionStorage.getItem("cantMoves");
    cantiMovi--
    sessionStorage.setItem("cantMoves",cantiMovi)

    continuar();
}

function equivocado() { ///DONE /*MOSTRAR CARTA EQUIVOCADA, ANIMACION, Y VOLVER AL SIGNO DE PREGUNTA*/
    
    setTimeout(() => {//aguanta 15ms a que vea el par erroneo
        firstCard.setAttribute('class', "animate__animated animate__flipOutY");
        secondCard.setAttribute('class', "animate__animated animate__flipOutY");
        
        setTimeout(() => {//animar la salida e inmediatamente 4ms despues la entrada de los signos de pregunta
            firstCard.setAttribute('class', "animate__animated animate__flipInY");
            secondCard.setAttribute('class', "animate__animated animate__flipInY");
            firstCard.src = `../images/backCard.png`;
            secondCard.src = `../images/backCard.png`;
            continuar();
        }, 400);
    }, 1500);
}

let wachinTop3=false;

function continuar() {/*Siguiente movimiento o terminar*/
    firstCard = null;
    secondCard = null;
    lockScreen = false;

    cantiMovi = sessionStorage.getItem("cantMoves");
    console.log(cantiMovi)

    if(cantiMovi==0){/////////////////////////////Termino el juego

        let tipoDificultad = sessionStorage.getItem("tipoDificultad");
        let movFinales = document.getElementById('moves').textContent; //winMoves

        let oldRank;

        //Intente copiar el tipo de dificultad y sumarselo a un string que diga lista pero por alguna razon no podia leer local storage y me devolvia null asi que voy a usar switch de vuelta
        //tuve problemas con el switch tambien pero RESULTA que tipoDificultad era un "string" en vez de un "int" :)))))))))))))))))))))) pues "amo" js...
        switch(tipoDificultad){ 
            case "4":/*FACIL CON 4 PARES DE CARTAS*/
                oldRank ="lista4"
                console.log("easy with 4 pairs of cards");
                break;
            case "8":/*MEDIANO CON 8 PARES DE CARTAS*/
                oldRank ="lista8"
                console.log("medium with 8 pairs of cards");
                break;
            default:/*12 DIFICIL CON 12 PARES DE CARTAS*/
                oldRank ="lista12"
                console.log("hard with 12 pairs of cards");
                break;
        }

        let newRank = JSON.parse(localStorage.getItem(oldRank));
        
        console.log(newRank);

        for (let i = 0; i < 3; i++) {
            console.log(newRank[i].winMoves);
            if (newRank[i].winMoves >= movFinales) {
                wachinTop3=true;
                break;
            }
        }

        document.getElementById("best").style.display = "flex";

    }
}

let formulario = document.querySelector('form')

formulario.addEventListener('submit', (evento)=> { ///NEW
    evento.preventDefault()

    //POKEMON DE REGALO SI NO ENTRASTE AL TOP 3
    if(wachinTop3 == false){
        document.getElementById("notBest").style.display = "flex";
        let url = "https://pokeapi.co/api/v2/pokemon/" + pokerng();
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let spriteUrl = data.sprites.front_default;
                document.getElementById('pokemon').src = spriteUrl;
            })
            .catch(error => {
                console.error('La api tuvo un error...', error); //si le cambio la url con cualquier cosa aparece: la api tuvo un error... SyntaxError: JSON.parse: unexpected character at line 1 column 1 of the JSON data
            });
    }else{
        wachinTop3=false;
    }

    let tipoDificultad = sessionStorage.getItem("tipoDificultad");

    let nombre = formulario.querySelector('#nombre').value;        //winner
    let movFinales = document.getElementById('moves').textContent; //winMoves
    
    let dificulté;
    switch(tipoDificultad){ 
        case "4":/*FACIL CON 4 PARES DE CARTAS*/
            oldRank ="lista4"
            console.log("easy with 4 pairs of cards");
            dificulté="facil";
            break;
        case "8":/*MEDIANO CON 8 PARES DE CARTAS*/
            oldRank ="lista8"
            console.log("medium with 8 pairs of cards");
            dificulté="mediano";
            break;
        default:/*12 DIFICIL CON 12 PARES DE CARTAS*/
            oldRank ="lista12"
            console.log("hard with 12 pairs of cards");
            dificulté="dificil";
            break;
    }

    let newRank = JSON.parse(localStorage.getItem(oldRank));
    let wachin = new Person(nombre, movFinales);
    //set up infoç

    newRank.push(wachin);
    newRank.sort((a, b) => a.winMoves - b.winMoves);

    localStorage.setItem(oldRank, JSON.stringify(newRank));

    console.log(oldRank, " ",newRank)
    
    document.getElementById("best").style.display = "none";

    actualizarTop(dificulté,newRank);
})