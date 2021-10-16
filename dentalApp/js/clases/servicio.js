class Servicio {
    constructor(nombre, urlImagen, descripcion, precio, limite) {
        this.nombre = nombre;
        this.urlImagen = urlImagen;
        this.descripcion = descripcion;
        this.precio = precio;
        this.limite = limite;
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
    dibujarEnLaLista() {
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
        cardPrecio.innerHTML = `<strong>Precio: </strong>${this.getPrecio()}`;

        //Ahora debo comenzar a agregar los childs
        divCardBody.appendChild(cardTitle);
        divCardBody.appendChild(cardDescripcion);
        divCardBody.appendChild(cardPrecio);

        divCard.appendChild(cardImg);
        divCard.appendChild(divCardBody);

        divColSm3.appendChild(divCard);

        listaServiciosDisponibles.appendChild(divColSm3);
    }

                                    
}

{/* 
<div class="col-sm-3">
    <div class="card">
        <img src="URL IMAGEN" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Nombre Servicio</h5>
            <p class="card-text">Descripcion</p>
            <p class="card-text"><strong>Precio:</strong> $x</p>
        </div>
    </div>
</div> */}