const apiUrl = "https://api.yumserver.com/16695/products";

async function getStock () {
    try {
        const response = await fetch(apiUrl);
        const vehiculos = await response.json();

        console.log(vehiculos);

    } catch (error) {
        console.error(error);
    }
}
getStock();

function MostrarProductos (productos) {
    let html = ``;
    for (let i = 0; i < productos.length; i++) {
        let mostrarProductos = productos[i];
        html += `
            <div class= "productos-container">               
                <h2>Modelo: ${mostrarProductos[i].modelo}</h2>
                <span>Año de Fabricacion ${mostrarProductos[i].anio}</span>
                <span>Precio pesos: ${mostrarProductos[i].precioPesos} </span>
                <span>Precio Dolar: ${mostrarProductos[i].precioDolar}</span>
            </div>
        `
    }

    document.body.innerHTML = html

}



function CrearNuevoProducto(){
    let producto = {
        modelo: document.getElementById('modelo').value,
        anio: document.getElementById('anio').value,
        precioPesos: document.getElementById('precioPesos').value,
        precioDolar: document.getElementById('precioDolar').value,
    };
    fetch(apiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
    .then(response => response.text())
    .then( function (data) { 
            if (data.trim() == 'OK'){
                alert('Se creo el producto con exito');
            }
            else {
                alert(data);
            }
        }
    )
    .catch(error => console.error('Error: ', error));
}



