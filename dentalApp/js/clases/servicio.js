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

    // Este método va a dibujar el servicio en la Lista de servicios
    // Lo agrega como una Card de Bootstrap 
    dibujarEnLaList3a() {
        // Cargo el div del index.html donde quiero comenzar a agregar los distintos servicios
        const listaServiciosDisponibles = document.getElementById('lista-servicios-disponibles');

        // Creo los distintos elementos, y asigno clases css y atributos.
        const divColSm3 = document.createElement('div');
        divColSm3.classList.add('col-sm-3');

        const divCard = document.createElement('div');
        divCard.classList.add('card','mt-4');

        const cardImg = document.createElement('img');
        cardImg.classList.add('card-img-top');
        cardImg.src = this.getUrlImagen();

        const divCardBody = document.createElement('div');
        divCardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerText = this.getNombre();

        const cardDescripcion = document.createElement('p');
        cardDescripcion.classList.add('card-text');
        cardDescripcion.innerText = this.getDescripcion();

        const cardPrecio = document.createElement('p');
        cardPrecio.classList.add('card-text');
        cardPrecio.innerHTML = `<strong>Precio: </strong>$${this.getPrecio()}`;

        const cardButtonAdd = document.createElement('button');
        cardButtonAdd.classList.add('btn','btn-info');
        cardButtonAdd.innerHTML='Agregar';
        
        const cardButtonDecrease = document.createElement('button');
        cardButtonDecrease.classList.add('btn', 'btn-danger', 'ms-1');
        cardButtonDecrease.setAttribute('disabled',true);
        cardButtonDecrease.innerHTML="Quitar";
        
        cardButtonAdd.addEventListener('click', () => {
            
            if (this.cantidad===0) {
                this.agregarAlArrayDeServiciosSeleccionados(this);
                this.agregarCantidad();
                cardButtonDecrease.removeAttribute('disabled');
                divCard.classList.add('card-seleccionada');
            } else {
                this.existeElServicioEnElArrayDeSeleccionadosEntoncesAgregaUno(this);
            }
                
            agregarListaSeleccionadosYDevolverMontosTotales();
            
        })

        cardButtonDecrease.addEventListener('click', () => {
            if (this.cantidad === 1) {
                cardButtonDecrease.setAttribute("disabled",true);
                divCard.classList.remove("card-seleccionada");
                this.existeElServicioEnElArrayDeSeleccionadosEntoncesRestaUno(this);
            }
            else if (this.cantidad > 0 ) {
                this.existeElServicioEnElArrayDeSeleccionadosEntoncesRestaUno(this);
            } 
            else{ 
                cardButtonDecrease.setAttribute("disabled",true);
                
            }
            agregarListaSeleccionadosYDevolverMontosTotales();
        })

        //Ahora debo comenzar a agregar los childs
        divCardBody.appendChild(cardTitle);
        divCardBody.appendChild(cardDescripcion);
        divCardBody.appendChild(cardPrecio);
        divCardBody.appendChild(cardButtonAdd);
        divCardBody.appendChild(cardButtonDecrease);

        divCard.appendChild(cardImg);
        divCard.appendChild(divCardBody);

        divColSm3.appendChild(divCard);

        listaServiciosDisponibles.appendChild(divColSm3);
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