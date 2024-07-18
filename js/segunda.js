/*
SEGUNDA ENTREGA
Lista de tareas
-Se pueden agregar tareas, enlistar las agregadas, eliminar y al enlistar ver la actualización de las tareas existentes
(es decir que no veremos las que se eliminaron)
*/

class Tarea{
    constructor(titu){
        this.titulo=titu;

        let creation= new Date();
        this.fechaHora=creation.toLocaleString();
    }
}

const tareaArray=[];

function crear(){
    while(true){
        let input = prompt("Ingrese un titulo de la tarea:") //No se que tan buena idea sea hacer una variable nueva aun si el usuario la escriba mal... pero javascript no tira error asi que no estoy seguro como funciona js
        if(input!==null && input!==""){

            let nuevaTarea = new Tarea(input)
            console.log("nueva tarea: ",nuevaTarea)
            tareaArray.push(nuevaTarea);

            console.log("tareaArray: ",tareaArray)
            break;
        }else{
            alert("Titulo vacio. Intente de nuevo")
        }
    }
    listar()
}

function borrar(){
    let input = prompt("Escriba que tarea borrar por el numero de su index")-1; //Falta agregar algo para que solo acepte numeros naturales
    console.log(input)
    if(input >= 0 && input < tareaArray.length){
        tareaArray.splice(input,1)
        listar()
    }else{
        alert("Error al borrar, intente de nuevo")
    }
}

function listar() {
    let tareaIndex=1
    const tareaLista = document.getElementById("tareas");
    tareaLista.innerHTML = "";

    tareaArray.forEach(tarea => {
        
        let li = document.createElement("li");
        li.textContent = `
        INDEX DE TAREA: ${tareaIndex} 
        NOMBRE DE TAREA: ${tarea.titulo} 
        TIEMPO DE CREACION: ${tarea.fechaHora} 
        `;
        tareaIndex++;
        
        tareaLista.appendChild(li);
    });
}

function editar(){
    let input = prompt("Escriba que tarea editar por el numero de su index")-1; //Falta agregar algo para que solo acepte numeros naturales
    console.log(input)
    if(input >= 0 && input < tareaArray.length){
        while(true){
            tareaArray[input].titulo = prompt("Escriba el nuevo texto")
            if(tareaArray[input].titulo!=null && tareaArray[input].titulo!==""){
                listar()
                break;
            }else{
                alert("Intente de nuevo")
            }
        }

    }else{
        alert("Error al editar, intente de nuevo")
    }
}