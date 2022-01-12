//Variables
const resultado = document.querySelector('#resultado');
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
//Recuperar el año actual
const max = new Date().getFullYear();
//Le quitamos 10 años
const min = max - 10;
//Generar un objeto para la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}
//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);
    //Llena el combo de años
    llenarSelect();
})
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})
year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;
    filtrarAuto();
})
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
})
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
})
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto();
})
//Funciones
function mostrarAutos(autos) {
    //Limpiar los valores previos
    limpiarHTML();
    //Recorre todo el arreglo de autos
    autos.forEach(auto => {
    const {marca, modelo, year, precio, puertas, color, transmision} = auto;
    const autoHTML = document.createElement('p');
    autoHTML.textContent = `
        MARCA: ${marca}, MODELO: ${modelo}, AÑO: ${year} PRECIO: ${precio}
        PUERTAS: ${puertas}, COLOR: ${color}, TRANSMISIÓN: ${transmision}
    `;
    //insertar en la página
    resultado.appendChild(autoHTML);
    });
}
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option'); //Los hijos de un select son option
        //El cual debe llevar un valor y un texto
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}
//Limpiar los resultados anteriores de los automóviles
function limpiarHTML() {
    while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
    }
}
//Función que filtra en base a la búsqueda
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo)
    .filter(filtrarMaximo).filter(filtrarTransmision).filter(filtrarColor).filter(filtrarPuertas);
    if (resultado.length > 0) {
    mostrarAutos(resultado);
    } else {
    noResultados();
    }
}
function filtrarMarca(auto) {
    if (datosBusqueda.marca) { //asegura que tenga un valor
    return auto.marca === datosBusqueda.marca;
    }
    return auto;
}
function filtrarYear(auto) {
    if (datosBusqueda.year) { //asegura que tenga un valor
    return auto.year === parseInt(datosBusqueda.year); //porque el año es un entero
    }
    return auto;
}
function filtrarMinimo(auto) {
    if (datosBusqueda.minimo) {
    return auto.precio >= parseFloat(datosBusqueda.minimo); //Porque el precio tiene decimales
    }
    return auto;
}
function filtrarMaximo(auto) {
    if (datosBusqueda.maximo) {
    console.log(datosBusqueda.maximo);
    return auto.precio <= parseFloat(datosBusqueda.maximo); //Porque el precio tiene decimales
    }
    return auto;
}
function filtrarTransmision(auto) {
    if (datosBusqueda.transmision) { //asegura que tenga un valor
    return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
   }
function filtrarColor(auto) {
    if (datosBusqueda.color) { //asegura que tenga un valor
    return auto.color === datosBusqueda.color;
    }
    return auto;
   }
function filtrarPuertas(auto) {
    if (datosBusqueda.puertas) { //asegura que tenga un valor
    return auto.puertas === parseInt(datosBusqueda.puertas); //porque el año es un entero
    }
    return auto;
   }
   
//Agregar aquí los otros filtros
//...............................
function noResultados() {
    limpiarHTML();
    const sinResultados = document.createElement('div');
    sinResultados.classList.add('alerta', 'error');
    sinResultados.textContent = "No hay resultados";
    resultado.appendChild(sinResultados);
}