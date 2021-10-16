/*
    C: Create
    R: Read
    U: Update
    D: delete
*/


class Perro {
    
    constructor(nombre, color, edad){
        this.nombre = nombre.toLowerCase();
        this.color = color.toLowerCase();
        this.edad = edad;
    }
    

}

// Lista de perritos
let perritos = [];


//Devuelve todo los perritos
const getAll = () => {
    perritos = JSON.parse(localStorage.getItem('perritos'));
    return perritos;
}

// Metodo para agregar un perro a la lista
const create = (perrito) => {
    perritos.push(perrito);
    localStorage.setItem('perritos', JSON.stringify(perritos));
}

// Metodo para hallar un perro
const findOne = (nombre) => {
    nombre = nombre.toLowerCase();
    const perro = perritos.find( perro => perro.nombre === nombre) 

        if (!perro) {
            throw new Error(`No existe ${nombre}`)
        }

        return perro;
    
}

// Metodo para eliminar un perrito

const remove = (nombre) => {
    const perro = findOne(nombre);

    const index = perritos.indexOf(perro);
    perritos.splice(index, 1);
    
/*     const index = perritos.findIndex(perro => perro.nombre === nombre);
    if(index >= 0) {
        perritos.splice(index, 1);
    } */
}

// Metodo para modificar un dato
const update = (nombre, color) => {
    const perro = findOne(nombre);
    perro.color = color;
}

//Paso 1
// Crear un nuevo perro

const perro1= new Perro('Molo','marrón',1);
const perro2= new Perro('Malena','negra',7);
const perro3= new Perro('Argos','azul',5);
const perro4= new Perro('Pacha','gris',15);


//Paso 2
// agregar perro1 a la lista

/*
create(perro1);
create(perro2);
create(perro3);
create(perro4); 
*/

//Paso 3
// busco a un perro por su noimbre
//console.log(findOne('molo'));
console.log(getAll());
//remove('molo');
console.log(getAll());

update('argos',"blanco")
console.log(getAll());