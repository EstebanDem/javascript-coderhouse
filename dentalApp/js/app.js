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
const btnAgregarPaciente = document.getElementById('btn-agregar-paciente');

// Cargo los input del DOM
const inputNombre = document.getElementById('input-nombre');
const inputApellido = document.getElementById('input-apellido');
const inputEdad = document.getElementById('input-edad');
const inputObraSocial = document.getElementById('lista-obras-sociales');

// Cargo los divs donde voy a mostrar los datos del paciente
const divFactura = document.getElementById('div-factura');
const datosNombreFactura = document.getElementById('datos-nombre-factura');
const datosEdadFactura = document.getElementById('datos-edad-factura');
const datosObraSocialFactura = document.getElementById('datos-obra-social-factura');


btnAgregarPaciente.addEventListener('click', () => {
    divFactura.style.display="block";
    const options = inputObraSocial.options;
    const id = options[options.selectedIndex].id;

    paciente = new Persona(inputNombre.value,inputApellido.value,inputEdad.value,getObraSocialFromList(id));
    datosNombreFactura.innerHTML=`<strong>Nombre Completo: </strong>${paciente.getNombre()} ${paciente.getApellido()}`;
    datosEdadFactura.innerHTML=`<strong>Edad: </strong>${paciente.getEdad()}`;
    datosObraSocialFactura.innerHTML= `<strong>Obra social: </strong>${paciente.getObraSocial().getNombre()}`;
    
    deshabilitarFormPaciente();
    mostrarListaServiciosDisponibles();
})

const mostrarListaServiciosDisponibles = () => {
    document.getElementById('lista-servicios-disponibles').style.display='flex';
}

const getObraSocialFromList= (id) => {
    return obrasSociales[id];
}

const deshabilitarFormPaciente= () => {
    inputNombre.setAttribute('disabled',true);
    inputApellido.setAttribute('disabled',true);
    inputEdad.setAttribute('disabled',true);
    inputObraSocial.setAttribute('disabled',true);
    btnAgregarPaciente.setAttribute('disabled',true);
}


// let serviciosSeleccionados = [];
const tablaServiciosBody= document.getElementById('tabla-servicios-body');
const tablaServicios = document.getElementById('tabla-servicios')
const precioTotalFacturaUI= document.getElementById('precio-total-factura');
const precioTotalFacturaConDescuentoUI= document.getElementById('precio-total-factura-descuento');


let precioTotalFactura=0;
let precioTotalFacturaConDescuento=0;

function agregarListaSeleccionadosYDevolverMontosTotales() {
    DeleteRows();
    precioTotalFactura=0;
    eliminarDeLaListaSiLaCantidadEsCero();
    serviciosSeleccionados.forEach((element,index) => {

        const tableRow = document.createElement('tr');

        const tableHeader = document.createElement('th');
        tableHeader.setAttribute('scope','row');
        tableHeader.innerText=(index+1);

        const tableDataCantidad = document.createElement('td');
        tableDataCantidad.innerText = element.getCantidad();

        const tableDataNombreServicio = document.createElement('td');
        tableDataNombreServicio.innerText = element.getNombre();

        const tableDataPrecio = document.createElement('td');
        tableDataPrecio.innerText = `$${element.getPrecio()}`;

        const tableDataPrecioConDescuento = document.createElement('td');
        tableDataPrecioConDescuento.innerText= `$${element.getPrecio() * paciente.obraSocial.getDescuentoEnPorcentaje()}`;
    
        tableRow.appendChild(tableHeader);
        tableRow.appendChild(tableDataCantidad);
        tableRow.appendChild(tableDataNombreServicio);
        tableRow.appendChild(tableDataPrecio);
        tableRow.appendChild(tableDataPrecioConDescuento);
    
        tablaServiciosBody.appendChild(tableRow);

        precioTotalFactura+=(element.getPrecio() * element.getCantidad());
    })    
    precioTotalFacturaUI.innerHTML= `<strong>Precio total:</strong> $${precioTotalFactura}`;
    precioTotalFacturaConDescuentoUI.innerHTML = `<strong>Precio total con ${paciente.obraSocial.getNombre()}
                                                 :</strong> $${precioTotalFactura * paciente.obraSocial.getDescuentoEnPorcentaje()}`;
}

function limpiarTabla() {
    let tablaServiciosChildren = tablaServicios.children;
    for (let i = 0; i < tablaServiciosChildren.length; i++) {
        tablaServicios.removeChild(tablaServiciosChildren[i])
    }
}

function DeleteRows() {
    let rowCount = tablaServicios.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        tablaServicios.deleteRow(i);
    }
}

function eliminarDeLaListaSiLaCantidadEsCero() {
    serviciosSeleccionados.forEach((element,index)=> {
        if (element.getCantidad() === 0) {
            serviciosSeleccionados.splice(index,1)
        }
    })
}

const btnAgregarAlLocalStorage = document.getElementById('btn-agregarlo-local-storage');
let listaPresupuesto = JSON.parse(localStorage.getItem('presupuestos')) || [];

btnAgregarAlLocalStorage.addEventListener('click', () => {
    btnAgregarAlLocalStorage.setAttribute('disabled',true);
    btnAgregarAlLocalStorage.innerHTML = 'Ya guardaste la factura!';
    listaPresupuesto.push(new Presupuesto(paciente,serviciosSeleccionados));
    localStorage.setItem('presupuestos', JSON.stringify(listaPresupuesto));
})