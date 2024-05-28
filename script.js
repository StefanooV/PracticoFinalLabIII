
        const apiUrl = "https://api.yumserver.com/16695/products";

        //fetch(apiUrl)
        //    .then(response => response.json())
        //    .then(data => console.log(data))
        //    .catch(error => console.error('Error:', error));

        //GET
        function ObtenerProductos(){
            fetch(apiUrl)
            .then(response => response.json())
            .then(productos => {
                console.log(productos)
                MostrarProductos(productos);
            })
            .catch(error => console.error('Error: ', error ));
        }

        //MOSTRAR
        function MostrarProductos (productos) {
            let html = ``;
            for (let i = 0; i < productos.length; i++) {
                if (productos.length == 0) {
                    html = `<p>No hay productos disponibles.</p>`;
                } 
                else {
                    console.log(productos[i])
                    html += `
                        <div>        
                            <div>
                                <ul>
                                    <li> IDcod: ${productos[i].idcod}</li>
                                    <li> Modelo: ${productos[i].titulo}</li>
                                    <li> Precio pesos: ${productos[i].precioPesos}</li>
                                    <li> Precio Dolar: ${productos[i].precioDolar}</li>
                                    <li> Año de Fabricacion ${productos[i].anio}</li>
                                </ul>
                            </div>
                        </div>
                    `;
                }
            }
            document.getElementById('resultados').innerHTML = html;
        }
        ObtenerProductos();

        //POST
        function CrearNuevoProducto(event) {
            event.preventDefault(); 
        
            let producto = {
                titulo: document.getElementById('titulo').value,
                precioPesos: document.getElementById('precioPesos').value,
                precioDolar: document.getElementById('precioDolar').value,
                fecha: document.getElementById('anio').value,
            };
        
            console.log("Producto a enviar:", producto);
        
            fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(texto => { 
                console.log("Respuesta de la API:", texto); 
                if (texto.trim() === 'OK') {
                    alert('Se creó el producto con éxito');
                } else {
                    alert(texto);
                }
            })
            .catch(error => {
                console.error('Error: ', error);
                alert('Error al crear el producto. Verifica la consola para más detalles.');
            });
        }

        document.getElementById('formAgregar').addEventListener('submit', CrearNuevoProducto);
    


