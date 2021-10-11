class Presupuesto {
    constructor(persona, servicios) {
        this.persona = persona;
        this.servicios = servicios;
    }

    getTotalDescuentoIncluido() {
        let total = 0;
        this.servicios.forEach(element => {
            total+= element.getPrecio();
        })
        return total * this.persona.obraSocial.getDescuentoEnPorcentaje();
    }
}