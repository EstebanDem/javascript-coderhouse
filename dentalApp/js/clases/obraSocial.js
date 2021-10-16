class ObraSocial {
    constructor(nombre, descuento) {
        this.nombre = nombre;
        this.descuento = descuento;
    }

    getNombre() {
        return this.nombre;
    }

    getDescuento() {
        return this.descuento;
    }

    getDescuentoEnPorcentaje() {
        return (100-this.getDescuento()) / 100;
    }

    agregarObraSocialAlSelector() {
        const listaObrasSociales = document.getElementById('lista-obras-sociales');
        const item = document.createElement('option');
        item.innerText = this.getNombre();
        item.value = this.getDescuento();
        listaObrasSociales.appendChild(item);
    }
}