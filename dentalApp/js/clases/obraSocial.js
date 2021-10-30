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
        $('#lista-obras-sociales').append(
            `
            <option id="${this.getId()}" value="${this.getDescuento()}">
                ${this.getNombre()}
            </option>
            `
        );
    }
}