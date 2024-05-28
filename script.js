const apiUrl = "https://api.yumserver.com/16695/products";

//Obtener todos los productos
function ObtenerProductos(){
    fetch(apiUrl)
    .then(response => response.json())
    .then(MostrarProductos)
    .catch(error => console.error('Error: ', error ));
}


function MostrarProductos (productos) {
    let html = ``;
    for (let i = 0; i < productos.length; i++) {
        html += `
            <div class= "producto-card">
                <img src="imgs/imagen-auto.png" alt="Card Image" class="producto__logo">               
                <div class = "producto__info"
                    <ul class = "producto__list">
                        <li class="producto__item">IDcod: ${productos[i].idcod}</li>
                        <li class="producto__item">Modelo: ${productos[i].modelo}</li>
                        <li class="producto__item">Año de Fabricacion ${productos[i].anio}</li>
                        <li class="producto__item">Precio pesos: ${productos[i].precioPesos}</li>
                        <li class="producto__item">Precio Dolar: ${productos[i].precioDolar}</li>
                    </ul>
                </div>
            </div>
        `
    }

    document.getElementById('resultados').innerHTML = html;
}

window.onload = ObtenerProductos;


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
    .then( 
        function (texto) { 
            if (texto.trim() == 'OK'){
                alert('Se creo el producto con exito');
            }
            else {
                alert(texto);
            }
        }
    )
    .catch(error => console.error('Error: ', error));
}



