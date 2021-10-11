class Servicio {
    constructor(nombre, descripcion, precio, limite) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.limite = limite;
    }

    getPrecio() {
        return this.precio;
    }

    static getPrecios(arrayServiciosSeleccionados) {
        let total=0;
        arrayServiciosSeleccionados.forEach(element => {
            total+=element.getPrecio();
        })
        return total;
    }

    
}