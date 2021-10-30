class Servicio {
    constructor(id, cantidad, nombre, urlImagen, descripcion, precio, limite) {
        this.id = id;
        this.cantidad = cantidad;
        this.nombre = nombre;
        this.urlImagen = urlImagen;
        this.descripcion = descripcion;
        this.precio = precio;
        this.limite = limite;
    }

    getId() {
        return this.id;
    }

    getCantidad() {
        return this.cantidad;
    }

    agregarCantidad() {
        this.cantidad++;
    }

    quitarCantidad() {
        this.cantidad--;
    }

    getUrlImagen() {
        return this.urlImagen;
    }

    getNombre() {
        return this.nombre;
    }

    getDescripcion() {
        return this.descripcion;
    }

    getPrecio() {
        return this.precio;
    }

    agregarAlArrayDeServiciosSeleccionados(claseServicio) {
        serviciosSeleccionados.push(claseServicio);
    }

    existeElServicioEnElArrayDeSeleccionadosEntoncesAgregaUno(claseServicio) {
        serviciosSeleccionados.forEach(element => {
            if(element.getId() === claseServicio.getId()) {
                this.agregarCantidad();
            } 
        })
    }

    existeElServicioEnElArrayDeSeleccionadosEntoncesRestaUno(claseServicio) {
        serviciosSeleccionados.forEach(element => {
            if(element.getId() === claseServicio.getId()) {
                this.quitarCantidad();
            } 
        })
    }

    dibujarEnLaLista() {

        $('#lista-servicios-disponibles').append(
            `
            <div class="col-sm-3">
                <div id="card-${this.getId()}" class="card mt-4">
                    <img class="card-img-top" src="${this.getUrlImagen()}">
                    <div class="card-body">
                        <h5 class="card-title">${this.getNombre()}</h5>
                        <p class="card-text">${this.getDescripcion()}</p>
                        <p class="card-text">
                            <strong>Precio: </strong>$${this.getPrecio()}
                        </p>
                        <button id="btn-agregar-${this.getId()}" class="btn btn-info">Agregar</button>
                        <button id="btn-quitar-${this.getId()}" class="btn btn-danger ms-1" disabled>Quitar</button>
                    </div>
                </div>
            </div>
            `
        )
        
        $(`#btn-agregar-${this.getId()}`).click( () => {
            if (this.cantidad===0) {
                this.agregarAlArrayDeServiciosSeleccionados(this);
                this.agregarCantidad();
                $(`#btn-quitar-${this.getId()}`).removeAttr('disabled');
                $(`#card-${this.getId()}`).addClass('card-seleccionada')
            } else {
                this.existeElServicioEnElArrayDeSeleccionadosEntoncesAgregaUno(this);
            }
            agregarListaSeleccionadosYDevolverMontosTotales();
        } )

        $(`#btn-quitar-${this.getId()}`).click( () => {
            if (this.cantidad === 1) {
                $(`#btn-quitar-${this.getId()}`).attr('disabled',true);
                $(`#card-${this.getId()}`).removeClass('card-seleccionada');
                this.existeElServicioEnElArrayDeSeleccionadosEntoncesRestaUno(this);
            }
            else if (this.cantidad > 0 ) {
                this.existeElServicioEnElArrayDeSeleccionadosEntoncesRestaUno(this);
            } 
            else{ 
                $(`#btn-quitar-${this.getId()}`).attr('disabled',true)
            }
            agregarListaSeleccionadosYDevolverMontosTotales();
        })
    }
}
