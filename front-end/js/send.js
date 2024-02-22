const handleSubmit = (event) => {
    event.preventDefault();

    // Captura os valores dos campos de entrada existentes
    const firstname = document.querySelector('input[name=firstname]').value;
    const lastname = document.querySelector('input[name=lastname]').value;
    const email = document.querySelector('input[name=email]').value;
    const tel = document.querySelector('input[name=tel]').value;
    const city = document.querySelector('input[name=city]').value;

    // Coleta os dados dos produtos selecionados e seus volumes
    const products = [];
    for (let i = 1; i <= 15; i++) {
        const productCheckbox = document.getElementById(`p${i}`);
        if (productCheckbox.checked) {
            const volumeInput = document.getElementById(`volume${i}`).value;
            products.push({
                product: productCheckbox.value,
                volume: volumeInput || '0', // Caso não haja volume, envia '0'
            });
        }
    }

    // Prepara os dados para envio, incluindo os produtos e volumes
    const data = {
        firstname,
        lastname,
        email,
        tel,
        city,
        products: JSON.stringify(products), // Converte a lista de produtos em uma string JSON
    };

    fetch('https://api.sheetmonkey.io/form/nAgMX6GjWHZpsrWrD5ZrtC', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    }).then(data => {
        console.log('Data submitted successfully:', data);
    }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

document.querySelector('form').addEventListener('submit', handleSubmit);