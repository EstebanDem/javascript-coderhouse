class ObraSocial {
    constructor(id,nombre, descuento) {
        this.id = id;
        this.nombre = nombre;
        this.descuento = descuento;
    }

    getNombre() {
        return this.nombre;
    }

    getId() {
        return this.id;
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
        item.id = this.getId();
        item.value = this.getDescuento();
        listaObrasSociales.appendChild(item);
    }
}