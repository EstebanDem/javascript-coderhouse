//import { Persona } from "./clases/persona";

const obrasSociales = [];
const servicios = [];

let serviciosSeleccionados = [];

/* - - - - - - - - - -  Cargamos la información de inicio - - - - - - - - - -*/

/* Obras Sociales */
dataObrasSociales.forEach((element,index) =>{
    obrasSociales.push(new ObraSocial(index,element.nombre, element.descuento));
})

/* Agrego las obras sociales al selector del formulario */
obrasSociales.forEach(element => {
    element.agregarObraSocialAlSelector();
})


/* Servicios */
dataServicios.forEach((element,index) => {
    servicios.push(new Servicio(index,0,element.nombre, element.urlImagen ,element.descripcion,element.precio,element.limite));
})

/* Dibujo los elementos en el DOM */
servicios.forEach(element => {
    element.dibujarEnLaLista();
})

//const asd = new Persona()

// Agrego un evento al botón de agregar paciente para que se cree una clase cuando se lo presione
let paciente;
const btnAgregarPaciente = $('#btn-agregar-paciente');

// Cargo los input del DOM
const inputNombre = $('#input-nombre');
const inputApellido = $('#input-apellido');
const inputEdad = $('#input-edad');

btnAgregarPaciente.click( () => {
    $('#div-factura').css("display","block");
    
    const inputObraSocial = $('#lista-obras-sociales option:selected');
    const id = inputObraSocial.prop("id");

    paciente = new Persona(inputNombre.val(),inputApellido.val(),inputEdad.val(),getObraSocialFromList(id));

    $('#datos-nombre-factura').html(
        `<strong>Nombre Completo: </strong>${paciente.getNombre()} ${paciente.getApellido()}`
    )
    $('#datos-edad-factura').html(
        `<strong>Edad: </strong>${paciente.getEdad()}`
    );
    $('#datos-obra-social-factura').html(
        `<strong>Obra social: </strong>${paciente.getObraSocial().getNombre()}`
    );
    deshabilitarFormPaciente();
    $('#lista-servicios-disponibles').css('display','flex')
})

const getObraSocialFromList= (id) => {
    return obrasSociales[id];
}

const deshabilitarFormPaciente= () => {
    $('#input-nombre').attr('disabled',true)
    $('#input-apellido').attr('disabled',true)
    $('#input-edad').attr('disabled',true)
    $('#lista-obras-sociales').attr('disabled',true)
    $('#btn-agregar-paciente').attr('disabled',true)
}


let precioTotalFactura=0;
let precioTotalFacturaConDescuento=0;

function agregarListaSeleccionadosYDevolverMontosTotales() {
    $('#tabla-servicios-body > tr').remove();
    precioTotalFactura=0;
    eliminarDeLaListaSiLaCantidadEsCero();
    serviciosSeleccionados.forEach((element,index) => {
        $('#tabla-servicios-body').append(
            `
            <tr>
                <th scope="row">${index+1}</th>
                <td>${element.getCantidad()}</td>
                <td>${element.getNombre()}</td>
                <td>$${element.getPrecio()}</td>
                <td>$${element.getPrecio() * paciente.obraSocial.getDescuentoEnPorcentaje()}</td>
            </tr>
            `
        )
        precioTotalFactura+=(element.getPrecio() * element.getCantidad());
    })
    $('#precio-total-factura').html(`<strong>Precio total:</strong> $${precioTotalFactura}`);    
    $('#precio-total-factura-descuento').html(`
        <strong>Precio total con ${paciente.obraSocial.getNombre()}:</strong> 
        $${precioTotalFactura * paciente.obraSocial.getDescuentoEnPorcentaje()}
    `);
}


function eliminarDeLaListaSiLaCantidadEsCero() {
    serviciosSeleccionados.forEach((element,index)=> {
        if (element.getCantidad() === 0) {
            serviciosSeleccionados.splice(index,1)
        }
    })
}

const btnAgregarAlLocalStorage = $('#btn-agregarlo-local-storage');
let listaPresupuesto = JSON.parse(localStorage.getItem('presupuestos')) || [];

btnAgregarAlLocalStorage.click( () => {
    btnAgregarAlLocalStorage.attr('disabled',true);
    btnAgregarAlLocalStorage.html('<strong>Ya guardaste la factura!</strong>');
    listaPresupuesto.push(new Presupuesto(paciente,serviciosSeleccionados));
    localStorage.setItem('presupuestos', JSON.stringify(listaPresupuesto));
    parseListaPrespuestos();
})

function parseListaPrespuestos() {
    listaPresupuesto = JSON.parse(localStorage.getItem('presupuestos'));
}

$('#link-lista-total-facturas').click( () => {
    $('#modal-lista-facturas').empty();
    $('#modal-lista-facturas').append(
        `
        <table class="table table-hover">
            <thead>
                Falta completar!
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody id="tbody-lista-facturas>
            asdasdsad
            </tbody>
        </table>
        `
    );
    listaPresupuesto.forEach(element => {
        $('#modal-lista-factura').append(
            `<p>hoaaaaaaaaaaaaaaaaaala</p>`
        )
    })
})

{/* <tr>
<th scope="row">1</th>
<td>Mark</td>
<td>Otto</td>
<td>@mdo</td>
</tr> */}