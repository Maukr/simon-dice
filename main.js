let ronda = 0;
let secuenciaUsuario = [];
let secuenciaMaquina = [];

let $boton = document.querySelector("button[type=button]");
bloquearInputUsuario();
$boton.onclick = comenzarJuego;

function comenzarJuego(){
    reiniciarRonda();
    turnoMaquina();
}

function reiniciarRonda(){
    ronda = 0;
    secuenciaUsuario = [];
    secuenciaMaquina = [];
    actualizarNumeroRonda(ronda);
    bloquearInputUsuario();
}

function turnoMaquina(){
    bloquearInputUsuario();
    actualizarEstado("Turno de la máquina");

    secuenciaMaquina.push(cuadroAleatorio());

    const RETRASO_JUGADOR = (secuenciaMaquina.length + 1)*1000;

    secuenciaMaquina.forEach(function(elemento, index){
        const RETRASO_MAQUINA = (index+1) * 1000;
        setTimeout(function(){
            resaltarCuadro(elemento);
        },RETRASO_MAQUINA);
    });

    setTimeout(() => {
        desbloquearInputUsuario();
        actualizarEstado("Turno del usuario");
    }, RETRASO_JUGADOR);
    
    secuenciaUsuario = [];
    ronda++;
    actualizarNumeroRonda(ronda);
}

function actualizarNumeroRonda(ronda){
    document.querySelector("#ronda").textContent = "Ronda: " + ronda;
}

function manejarInput(event){
    let $cuadro = event.target;
    resaltarCuadro($cuadro);
    secuenciaUsuario.push($cuadro);
    console.log($cuadro);

    let $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1];

    if($cuadro.id !== $cuadroMaquina.id){
        perdiste();
        return;
    }
    if(secuenciaUsuario.length === secuenciaMaquina.length){
        bloquearInputUsuario();
        setTimeout(() => {
            turnoMaquina();
        }, 1000);
    }
}


function cuadroAleatorio(){
    let $cuadros = document.querySelectorAll(".cuadro");
    return $cuadros[Math.floor(Math.random() * 4)];
}

function resaltarCuadro(cuadro){
    cuadro.style.opacity = "1";

    setTimeout(() => {
        cuadro.style.opacity = "0.5";
    }, 500);
}


function actualizarEstado(texto){
    document.querySelector("#estado").textContent = texto;
}

function bloquearInputUsuario(){
    let $cuadros = document.querySelectorAll(".cuadro");
    $cuadros.forEach(function(element){
        element.onclick = function(){}; //Bloquea la posibilidad de hacer click
    });
}

function desbloquearInputUsuario(){
    let $cuadros = document.querySelectorAll(".cuadro");
    $cuadros.forEach(function(element){
          element.onclick = manejarInput;
    });
    
}

function perdiste(){
    actualizarEstado("Perdiste, vuelve a empezar");
    reiniciarRonda();
}