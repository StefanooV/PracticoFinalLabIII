const apiUrl = "https://api.yumserver.com/16695/products";

document.getElementById('formAgregar').addEventListener('submit', function(event){
    event.preventDefault();

    let modelo = document.getElementById('modelo').value;
    let anio = document.getElementById('anio').value;
    let pesos = document.getElementById('pesos').value;
    let dolar = document.getElementById('dolar').value;
    let imagen = document.getElementById('imagen').files[0];

    let formData = new formData();
    formData.append('modelo', modelo);
    formData.append('anio', anio);    
    formData.append('pesos', pesos);    
    formData.append('dolar', dolar);    
    formData.append('imagen', imagen);
    
    fetch(apiUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').innerText = 'Datos cargados exitosamente';
        console.log('Success:', data);
    })
    .catch(error => {
        document.getElementById('resultado').innerText = 'Error al cargar los datos';
        console.error('Error:', error);
    })
})