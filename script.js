const apiUrl = 'https://api.yumserver.com/16695/products';

async function mostrarVehiculos() {
    try {
        const response1 = await fetch(apiUrl);
        const vehiculos = await response1.json();
        console.log(vehiculos);
    } 
    catch(error) {
        console.error('Error', error);
    }

}

mostrarVehiculos();

//Extraccion de datos de formulario

const btnAgregar = document.querySelector('#btnAgregar');
const formAgregar = document.querySelector('#formAgregar');
const respuestaAgregar = document.querySelector('#respuestaAgregar');

//Funcion para sacar los datos del form
const obtenerDatos = () => {
    const datos = new FormData(formAgregar);
    const datosProcesados = Object.fromEntries(datos.entries());
    formAgregar.reset();
    return datosProcesados;  
}

const cargarDatos = async () => {
    
    const nuevoVehiculo = obtenerDatos();

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(nuevoVehiculo)
        });
        if(response.ok){
            const jsonResponse = await response.json();
            const {titulo, precioPesos, precioDolar, fecha} = jsonResponse;
            respuestaAgregar.innerHTML = `
            <ul>
                <li>${titulo}</li>
                <li>${precioPesos}</li>
                <li>${precioDolar}</li>
                <li>${fecha}</li>
            </ul>
            `
        }
    } 
    catch (error) {
        console.error('Error: ', error);
    }
}

btnAgregar.addEventListener('click', (event) => {
    event.preventDefault();
    cargarDatos();
})