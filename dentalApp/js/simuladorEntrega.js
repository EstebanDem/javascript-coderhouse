/* Versión super simplificada de lo que sería el proyecto */

let nombrePaciente, obraSocialPaciente, numeroDeServicios, servicio, precioServicio, precioTotal;

nombrePaciente = prompt("Ingrese el nombre del paciente: ");
obraSocialPaciente = prompt("Ingrese la O.S del paciente (OSDE, OSPE, MEDIFE): ");

let textoAuxiliar='';
let preguntarSeguir='';
let precioTotalServicios=0;

while(true) {
    servicio = prompt("Ingrese el nombre del servicio"); // <Ortodoncia> , <Endodoncia> , <Limpieza total>, <Extracción>, etc...
    precioServicio = prompt("Ingrese el precio del servicio anterior: "); 
    numeroDeServicios++;
    precioTotalServicios+=parseInt(precioServicio);
    textoAuxiliar+= `Servicio: ${servicio} precio $${precioServicio}\n`;
    preguntarSeguir = prompt("Agrega más servicios? (SI) para continuar");
    if (preguntarSeguir.toLowerCase() !=='si'){
        break;
    }
}

precioTotal = devolverTotalConDescuento(precioTotalServicios, descuentoPorObraSocial(obraSocialPaciente));
console.log(precioTotalServicios);

alert(`Paciente: ${nombrePaciente}\n Servicios\n ${textoAuxiliar}\n Total con descuento (por tener ${obraSocialPaciente}): ${precioTotal}`);


function descuentoPorObraSocial(obrasocial) {
    switch (obrasocial) {
        case 'OSDE':
            return 10;
        case 'OSPE':
            return 7;
        case 'MEDIFE':
            return 14;
        default:
            return 0;
    }
}

function devolverTotalConDescuento(subtotal, descuento) {
    return subtotal *((100-descuento)/100)
}