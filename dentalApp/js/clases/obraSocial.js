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
}