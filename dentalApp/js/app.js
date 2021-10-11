const obrasSociales = [];
const servicios = [];



/* - - - - - - - - - -  Cargamos la información de inicio - - - - - - - - - -*/

/* Obras Sociales */
dataObrasSociales.forEach(element =>{
    obrasSociales.push(new ObraSocial(element.nombre, element.descuento));
})

/* Servicios */
dataServicios.forEach(element => {
    servicios.push(new Servicio(element.nombre, element.descripcion,element.precio,element.limite));
})


/* Simulación del proceso por consola */

console.log('Ingrese los siguientes datos del paciente');
let nombrePaciente = prompt('Nombre: ');
let apellidoPaciente = prompt('Apellido: ');
let edadPaciente = prompt('Edad: ');

console.log('Ingrese su Obra Social, puede elegir entre las siguientes: ');
obrasSociales.forEach((element,index) => {
    console.log(index,element);
})
console.log('Para ello escriba el indice correspondiente a la obra social del paciente');
console.log('Por ejemplo, si tiene <MEDIFE> deberá escribir un <2>');
let obraSocialPaciente = parseInt(prompt('Obra social: '));

let paciente = new Persona(nombrePaciente,apellidoPaciente,edadPaciente,obrasSociales[obraSocialPaciente]);

console.log('Ingrese los servicios que se realizarán: ')

servicios.forEach((element,index) => {
    console.log(index,element);
})

let servicioPacienteConsola = "";

const arrayDeServiciosPaciente= [];

let continuar='';

while(continuar===''){
    servicioPacienteConsola = parseInt(prompt('Servicio: '));
    arrayDeServiciosPaciente.push(new Servicio(servicios[servicioPacienteConsola].nombre,servicios[servicioPacienteConsola].descripcion,servicios[servicioPacienteConsola].precio,servicios[servicioPacienteConsola].limite));
    continuar = prompt('Desea agregar mas ? No escriba NADA para continuar, solo aprete enter');
}

let presupuestoPaciente = new Presupuesto(paciente,arrayDeServiciosPaciente);

console.log(`Datos del presupesto\n 
            ${presupuestoPaciente.persona.getNombre()} ${presupuestoPaciente.persona.getApellido()} con O.S ${presupuestoPaciente.persona.obraSocial.getNombre()}\n
            Total: $${presupuestoPaciente.getTotalDescuentoIncluido()}`);
