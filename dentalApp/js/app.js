const obrasSociales = [];
const servicios = [];



/* - - - - - - - - - -  Cargamos la información de inicio - - - - - - - - - -*/

/* Obras Sociales */
dataObrasSociales.forEach(element =>{
    obrasSociales.push(new ObraSocial(element.nombre, element.descuento));
})

/* Agrego las obras sociales al selector del formulario */
obrasSociales.forEach(element => {
    element.agregarObraSocialAlSelector();
})


/* Servicios */
dataServicios.forEach(element => {
    servicios.push(new Servicio(element.nombre, element.urlImagen ,element.descripcion,element.precio,element.limite));
})

/* Dibujo los elementos en el DOM */
servicios.forEach(element => {
    element.dibujarEnLaLista();
})
