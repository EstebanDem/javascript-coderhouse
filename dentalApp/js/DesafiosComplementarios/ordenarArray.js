// Ordenar un array de objetos

const dataObrasSociales2 = [
    {
        nombre: "OSDE",
        descuento: 15
    },
    {
        nombre: "ZSPE",
        descuento: 5
    },
    {
        nombre: "MEDIFE",
        descuento: 5
    },
    {
        nombre: "AMINT",
        descuento: 10
    }
]

const obrasSociales2= [];

/* Obras Sociales */
dataObrasSociales2.forEach(element =>{
    obrasSociales2.push(element);
})


function ordenarArrayPorParametro(array, ordenarPor) {
    if (ordenarPor==='nombre'){
        console.log("hola");
        array.sort((a,b) => {
            if (a.nombre==b.nombre) {
                return 0;
            }
            if (a.nombre < b.nombre) {
                return -1
            }
            return 1;
        })
    } else if (ordenarPor==='descuento') {
        array.sort((a,b) => a.descuento - b.descuento)
    } else {
        return array;
    }
}

ordenarArrayPorParametro(obrasSociales2, 'nombre');
console.log(obrasSociales2);
ordenarArrayPorParametro(obrasSociales2, 'descuento');
console.log(obrasSociales2);
