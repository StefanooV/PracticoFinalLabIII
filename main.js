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



