class Persona {
    constructor(nombre, apellido, edad, obraSocial) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.obraSocial = obraSocial;
    }
    
    getNombre() {
        return this.nombre;
    }

    getApellido() {
        return this.apellido;
    }

    getEdad() {
        return this.edad;
    }

    getObraSocial() {
        return this.obraSocial;
    }
}


