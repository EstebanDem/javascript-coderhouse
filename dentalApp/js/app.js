const URL_JSON_servicios = 'js/data/servicios.json';
const URL_JSON_obras_sociales = 'js/data/obrasSociales.json';
const obrasSociales = [];
let servicios = [];
let primeraVez= localStorage.getItem('primeraVez') || true;

let serviciosSeleccionados = [];

/* - - - - - -   Cargamos la información de inicio  - - - - - - -*/

/* Obras Sociales */
$.getJSON(URL_JSON_obras_sociales, (response, status) => {
    if (status !== 'success') {
        throw new Error(`Error al cargar ${URL_JSON_obras_sociales}`);
    }
    response.forEach( (element, index)=> {
        obrasSociales.push(new ObraSocial(index,element.nombre, element.descuento));
    })
    obrasSociales.forEach(element => {
        element.agregarObraSocialAlSelector();
    })
})

let serviciosResponse;
/* Servicios */
$.getJSON( URL_JSON_servicios, (response, status) => {
    serviciosResponse = response;
    if (status !== 'success') {
        throw new Error(`Error al cargar ${URL_JSON_servicios}`);
    }
    loadServicios(serviciosResponse);
})

function loadServicios(response) {
    response.forEach( (element,index) => {
        servicios.push(new Servicio(index,0,element.nombre, element.urlImagen ,element.descripcion,element.precio,element.limite));
    })
    servicios.forEach(element => {
        element.dibujarEnLaLista();
    })
}

primeraVez===true ? $('#alerta-ayuda-paso-1').show() : $('#alerta-ayuda-paso-1').hide(); 


/* Si es la primera vez que ingresa se mostrará ayuda, eso lo manejo a través de localStorage, sino no se muestra. */

// Agrego un evento al botón de agregar paciente para que se cree una clase cuando se lo presione
let paciente;
const btnAgregarPaciente = $('#btn-agregar-paciente');

// Cargo los input del DOM
const inputNombre = $('#input-nombre');
const inputApellido = $('#input-apellido');
const inputEdad = $('#input-edad');

function mostrarAyuda() {
    $('#alerta-ayuda-paso-1').fadeOut(600);
    $('#alerta-ayuda-paso-2').fadeIn(1000);
    $('#alerta-ayuda-paso-3').fadeIn(1000);
}

btnAgregarPaciente.click( () => {
    if(sonValidosTodosLosInputs()) {
        primeraVez===true ? mostrarAyuda() : null;
    
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
        $('#lista-servicios-disponibles').fadeIn(500);
        document.getElementById('lista-servicios-disponibles').scrollIntoView();
    }
    
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
        let precioConDescuento=element.getPrecio() * paciente.obraSocial.getDescuentoEnPorcentaje();

        $('#tabla-servicios-body').append(
            `
            <tr>
                <th scope="row">${index+1}</th>
                <td>
                    ${element.getCantidad()}
                    <button id="btn-tabla-agregar-${element.getId()}" type="button" class="btn btn-success btn-sm">+</button>
                    <button id="btn-tabla-quitar-${element.getId()}" type="button" class="btn btn-danger btn-sm">-</button>
                    
                </td>
                <td>${element.getNombre()}</td>
                <td>$${element.getPrecio()}</td>
                <td>$${precioConDescuento}</td>
                <td>$${precioConDescuento*element.getCantidad()} </td>
            </tr>
            `
        )
        element.agregarFuncionalidadBotonesTabla();
        precioTotalFactura+=(element.getPrecio() * element.getCantidad());
    })
    precioTotalFacturaConDescuento = precioTotalFactura * paciente.obraSocial.getDescuentoEnPorcentaje();
    $('#precio-total-factura').html(`<strong>Precio total:</strong> $${precioTotalFactura}`);    
    $('#precio-total-factura-descuento').html(`
        <strong>Precio total con ${paciente.obraSocial.getNombre()}:</strong> 
        $${precioTotalFacturaConDescuento}
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
    
    document.getElementById('h3-datos-del-paciente').scrollIntoView(); 
    primeraVez = false;
    localStorage.setItem('primeraVez',false);
    
    listaPresupuesto.push(new Presupuesto(paciente,serviciosSeleccionados,precioTotalFacturaConDescuento));
    localStorage.setItem('presupuestos', JSON.stringify(listaPresupuesto));
    parseListaPrespuestos();
    LimpiarValoresYOcultarDivs();

})


function parseListaPrespuestos() {
    listaPresupuesto = JSON.parse(localStorage.getItem('presupuestos')) || [];
}

$('#link-lista-total-facturas').click( () => {
    parseListaPrespuestos();
    listaPresupuestoLength = Object.keys(listaPresupuesto).length;
    $('#modal-lista-facturas').empty();
    if (listaPresupuestoLength===0) {
        $('#modal-lista-facturas').append(`
            <h3>No hay facturas guardadas 😔</h3>
        `)    
    } else {
        $('#btn-borrar-lista-facturas-modal').removeAttr('disabled');
        $('#btn-borrar-lista-facturas-modal').click( () => {
            localStorage.removeItem('presupuestos');
            $('#btn-borrar-lista-facturas-modal').attr('disabled',true)
        })

    
        $('#modal-lista-facturas').append(
            `
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre Completo</th>
                    <th scope="col">Obra Social </th>
                    <th scope="col">Servicios</th>
                    <th scope="col">Precio total</th>
                    </tr>
                </thead>
                <tbody id="ttbody-lista-facturas">
                </tbody>
            </table>
            `
        );
        
        
        listaPresupuesto.forEach((element,index) => {
            
            let serviciosMostradosComoString="";
            element.servicios.forEach(element => {
                serviciosMostradosComoString+=` ${element.nombre},`;
            })
            serviciosMostradosComoString =serviciosMostradosComoString.replace(/.$/,".");
            
            $('#ttbody-lista-facturas').append(
                `
                <tr>
                    <th scope="row">${index+1}</th>
                    <td>${element.persona.nombre} ${element.persona.apellido}</td>
                    <td>${element.persona.obraSocial.nombre}</td>
                    <td>${serviciosMostradosComoString}</td>
                    <td>$${element.montoFinal}</td>
                </tr>
                `
            )
        })
}
    
})


// Realizamos la validación de los datos ingresados para el usuario

const inputs = document.querySelectorAll('input');
const inputObraSocial = $('#lista-obras-sociales');
inputObraSocial.addClass('form-control invalid')

const patterns = {
    "input-nombre": /^[a-zA-Z ]+$/i,
    "input-apellido": /^[a-zA-Z ]+$/i,
    "input-edad": /^[\d]{1,2}$/
};

inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
      validate(e.target, patterns[e.target.attributes.id.value]);
    });
});
  
inputObraSocial.change( () => {
    inputObraSocial.removeClass('form-control invalid')
    inputObraSocial.addClass('form-control valid')
})


function validate(field, regex) {
    if (regex.test(field.value)) {
      field.className = 'form-control valid';
    } else {
      field.className = 'form-control invalid';
    }
}

function sonValidosTodosLosInputs() {
    let todosValidos=true;
    inputs.forEach(input => {
        if(!input.classList.contains('valid')){
            todosValidos=false;
        }
    })
    if(!document.getElementById('lista-obras-sociales').classList.contains('valid')) {
        todosValidos=false;
    }
    return todosValidos;
}


function LimpiarValoresYOcultarDivs() {
    $('#tabla-servicios-body > tr').remove();
    $("#lista-servicios-disponibles").empty();

    $('#lista-servicios-disponibles').fadeOut(500);
    $('#div-factura').fadeOut(500);

    eliminarAttrDisabledClassValidYSetearValorNulo($('#input-nombre'));
    eliminarAttrDisabledClassValidYSetearValorNulo($('#input-apellido'));
    eliminarAttrDisabledClassValidYSetearValorNulo($('#input-edad'));

    
    $('#lista-obras-sociales').removeAttr('disabled');
    $('#lista-obras-sociales').val("Seleccione de la lista").change();
    $('#lista-obras-sociales').removeClass('valid')
    $('#lista-obras-sociales').addClass('invalid')

    $('#btn-agregar-paciente').removeAttr('disabled');

    serviciosSeleccionados = [];
    servicios = []; 
    $('#precio-total-factura').html("");    
    $('#precio-total-factura-descuento').html("");
    $("#lista-servicios-disponibles").empty();
    loadServicios(serviciosResponse);

}

function eliminarAttrDisabledClassValidYSetearValorNulo(element) {
    element.removeAttr('disabled');
    element.removeClass('valid')
    element.val("");
}