/*
PRIMER ENTREGA
    0      1       2
    PIEDRA PAPEL O TIJERA
    ✊     ✋      ✌️
*/

/*MODO DE JUEGO*/
function esconder(elegir){
    document.getElementById("gameMode").style.display = "none";
    if(elegir==1){
        document.getElementById("vsCPU").style.display = "grid";
    }else{
        document.getElementById("vsPLAYER").style.display = "grid";
        document.getElementById("player1").style.display = "grid";
        document.getElementById("player2").style.display = "none";
    }
    console.log(0);
}

function goBack(){
    document.getElementById("gameMode").style.display = "grid";
    document.getElementById("vsCPU").style.display = "none"; /* <lazy programming> */
    document.getElementById("vsPLAYER").style.display = "none";
    document.getElementById("Rock").style.display = "none";
    document.getElementById("Paper").style.display = "none";
    document.getElementById("Scissors").style.display = "none"; /* </lazy programming> */

    reset()

    console.log(1);
}

let vicContador = 0;
let derContador = 0;
let empContador = 0;

function reset(){/*puntaje*/
    derContador=0;
    vicContador=0;
    empContador=0;
    document.getElementById("der").innerHTML = derContador;
    document.getElementById("vic").innerHTML = vicContador;
    document.getElementById("emp").innerHTML = empContador;
    console.log(2);
}

function quienGano(player1,player2){
    if(player1==player2){
        empContador++;
        document.getElementById("emp").innerHTML = empContador;
        console.log(player2 + " EMPATE "+empContador);
        alert("Empate");
    }else if(player1==0){ /*if player rock*/
        if(player2==2){
            vicContador++;
            document.getElementById("vic").innerHTML = vicContador;
            console.log(player1 + " " + player2 + " VICTORIA "+ vicContador + " A");
            alert("Ganaste: P1: PIEDRA P2: TIJERA");
        }else{
            derContador++;
            document.getElementById("der").innerHTML = derContador;
            console.log(player1 + " " + player2 + " DERROTA " + derContador + " B");
            alert("Perdiste: P1: PIEDRA P2: PAPEL");
        }
    }else if(player1==1){ /*if player paper*/
        if(player2==0){
            vicContador++;
            document.getElementById("vic").innerHTML = vicContador;
            console.log(player1 + " " + player2 + " VICTORIA "+ vicContador + " D");
            alert("Ganaste P1: PAPEL P2: PIEDRA");
        }else{
            derContador++;
            document.getElementById("der").innerHTML = derContador;
            console.log(player1 + " " + player2 + " DERROTA " + derContador + " C");
            alert("Perdiste P1: PAPEL P2: TIJERA");
        }
    }else{/*2*/            /*if player scissors*/
        if(player2==0){
            derContador++;
            document.getElementById("der").innerHTML = derContador;
            console.log(player1 + " " + player2 + " DERROTA " + derContador + " E");
            alert("Perdiste P1: TIJERA P2: PIEDRA");
        }else{
            vicContador++;
            document.getElementById("vic").innerHTML = vicContador;
            console.log(player1 + " " + player2 + " VICTORIA "+ vicContador  + " F");
            alert("Ganaste P1: TIJERA P2: PAPEL");
        }
    }
    console.log(4);
}

let pc;

function PVC(player){
    pc = Math.floor(Math.random()*3);
    switch(pc){
        case 0: /*PIEDRA*/
            document.getElementById("Rock").style.display = "grid";
            document.getElementById("Paper").style.display = "none";
            document.getElementById("Scissors").style.display = "none";
            break;
        case 1: /*PAPEL*/
            document.getElementById("Rock").style.display = "none";
            document.getElementById("Paper").style.display = "grid";
            document.getElementById("Scissors").style.display = "none";
            break;
        default: /*TIJERA*/
            document.getElementById("Rock").style.display = "none";
            document.getElementById("Paper").style.display = "none";
            document.getElementById("Scissors").style.display = "grid";
            break;
        }
    quienGano(player,pc)
    console.log(5);
}

let jugador1;

function player1(choice){
    jugador1=choice;
    document.getElementById("player1").style.display = "none";
    document.getElementById("player2").style.display = "grid";
    console.log(6);
}
function PVP(jugador2){
    document.getElementById("player2").style.display = "none";
    document.getElementById("player1").style.display = "grid";
    quienGano(jugador1,jugador2)
    console.log(7);
}
let salir = false;
let answer;
function exampleFor(){
    reset();
    while((derContador < 5 && vicContador < 5) && (salir==false)){
        answer = prompt("por favor eliga uno de los siguientes: 'Piedra' 'Papel' 'Tijera' 'Salir'");
        jugador1 = answer.toLowerCase()
        switch(jugador1){
            case "piedra":
                pc = Math.floor(Math.random()*3);
                quienGano(0,pc);
                console.log(8);
                break;
            case "papel":
                pc = Math.floor(Math.random()*3);
                quienGano(1,pc);
                break;
            case "tijera":
                pc = Math.floor(Math.random()*3);
                quienGano(2,pc);
                break;
            case "salir":
                salir=true;
                break;
            default:
                alert("Comando no legible, intente de nuevo");
                break;
            }
    }
    console.log(9);
    if(salir!=true){
        if(derContador==5){
            alert("Perdiste el mayor de 5...");
        }else{
            alert("Ganaste el mayor de 5!");
        }
    }else{
        salir = false;
    }
}