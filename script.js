var urlBase = "https://api.yumserver.com/9092/products";

//GET
function ObtenerProductos(){
    fetch(urlBase)
    .then(response => response.json())
    .then(MostrarProductos)
    .catch(error => console.error('Error: ', error ));
}


//MOSTRAR
function MostrarProductos (productos) {
    let html = ``;
    for (let i = 0; i < productos.length; i++) {
            console.log(productos[i])
            html += `
                <div class="form__card">
                    <img src="imgs/imagen-auto.png" class="stock__logo">
                    <ul>
                        <li><b>IDcod: ${productos[i].idcod}</b></li>
                        <li><b>Modelo: ${productos[i].titulo}</b></li>
                        <li>Precio en pesos: ${productos[i].precioPeso}</li>
                        <li>Precio en dolares: ${productos[i].precioDolar}</li>
                        <li>Fecha de emisión: ${productos[i].fecha}</li>
                    </ul>
                </div>
            `;
    }
    document.getElementById('respuestaAgregar').innerHTML = html;
}

//POST
function CrearNuevoProducto() {

    let producto = {
        titulo: document.getElementById('titulo').value,
        precioPeso: document.getElementById('precioPeso').value,
        precioDolar: document.getElementById('precioDolar').value,
        fecha: document.getElementById('fecha').value,
    };
    fetch(urlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
    .then(response => response.text())
    .then(
        function (texto){  
            if (texto.trim() == "OK") {
                alert('Se creó el producto con éxito');
                ObtenerProductos();
            } else {
                alert(texto);
            }
        }
    )
    .catch(error => console.error('Error: ', error));
}


