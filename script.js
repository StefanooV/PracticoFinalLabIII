var urlBase = 'https://api.yumserver.com/9092/products';

//Mostrar apenas se abre
document.addEventListener('DOMContentLoaded', () => {
    ObtenerProductos();
});

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
    let options = ``;
    for (let i = 0; i < productos.length; i++) {
            console.log(productos[i])
            html += `
                <div class="form__card">
                    <img src="imgs/imagen-auto.png" class="stock__logo">
                    <ul>
                        <li><strong>IDcod:</strong> ${productos[i].idcod}</li>
                        <li><strong>Modelo:</strong> ${productos[i].titulo}</li>
                        <li><strong>Precio en pesos:</strong> ${productos[i].precioPeso}</li>
                        <li><strong>Precio en dolares:</strong> ${productos[i].precioDolar}</li>
                        <li><strong>Fecha de emisión:</strong> ${productos[i].fecha}</li>
                    </ul>
                </div>
            `;
            options += `<option value ="${productos[i].idcod}">${productos[i].idcod}</option>`;
    }
    document.getElementById('respuestaAgregar').innerHTML = html;
    document.getElementById('idModificar').innerHTML = options;
    document.getElementById('idEliminar').innerHTML = options;
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


//PATCH
function Modificar(){
    
    var id = document.getElementById('idModificar').value;
    let productoModificado = {
        titulo: document.getElementById('NuevoTitulo').value, 
        precioPeso: document.getElementById('nuevoPrecioPesos').value,
        precioDolar: document.getElementById('nuevoPrecioDolar').value,
        fecha: document.getElementById('nuevaFecha').value,
    };

    fetch(`${urlBase}/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(productoModificado)
    })
    .then(response=>response.text)
    .then(function(texto){
        if(texto.trim() == "OK"){
            alert("Se a modificado correctamnte el vehiculo")
            ObtenerProductos();
        } else {
            alert(texto);
        }
    })
    .catch(error => console.error('Error: ', error));
}

//DELETE
function Borrar(){
    var idb = document.getElementById('idEliminar').value;

    if(confirm("Esta seguro que desea eliminar el vehículo")){
        fetch(`${urlBase}/${idb}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response=>response.text())
        .then(function(texto){
            if(texto.trim() == "OK"){
                alert('Vehículo eliminado con exito')
                ObtenerProductos()
            }
            else {
                alert(texto)
            }
        })
        .catch(error => console.error('Error: ', error));
    }
}
