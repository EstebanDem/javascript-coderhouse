const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

// Primera opción:

btn1.addEventListener('click', () => {
    console.log("Me clickeaste");
})

// Segunda opción:

btn2.onclick = () => {
    console.log("También me clickeaste");
}

//

const form = document.getElementById('form');
const inputName = document.getElementById('input-name');
const checkBox = document.getElementById('check-box');

/* let gustaMate = false;


checkBox.onclick = () => {
    gustaMate = !gustaMate;
    console.log(`Gusta mate: ${gustaMate}`);
} */

form.onsubmit = () => {
    let message
    if(checkBox.checked) {
        message = `A ${inputName.value} le gusta el mate`
    } else {
        message = `A ${inputName.value} NO le gusta el mate`
    }
    alert(message);
}

// Eventos del mouse: 

btn3.onmouseleave = () => {
    console.log("No te vayas");
    btn3.className = 'btn-rojo';
}

btn3.onmouseover = () => {
    console.log("Has vuelto");
    btn3.className = 'btn-azul';
}

// Eventos del teclado

inputName.onkeydown = () => {
    console.log("Presionaste una tecla")
}

inputName.onkeyup = () => {
    console.log("Soltaste una tecla");
}

inputName.onfocus = () => {
    console.log('On focus');
}

inputName.onblur = () => {
    console.log('On blur');
}