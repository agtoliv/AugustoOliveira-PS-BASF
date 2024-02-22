const handleSubmit = (event) => {
    event.preventDefault();

    // Captura os valores dos campos existentes
    const firstname = document.querySelector('input[name=firstname]').value;
    const lastname = document.querySelector('input[name=lastname]').value;
    const email = document.querySelector('input[name=email]').value;
    const tel = document.querySelector('input[name=tel]').value;
    const city = document.querySelector('input[name=city]').value;

    // Captura o valor do botão de rádio selecionado
    const productChoice = document.querySelector('input[name=option]:checked')?.value;

    // Adiciona a escolha do produto ao objeto que será enviado
    const formData = {
        firstname,
        lastname,
        email,
        tel,
        city,
        productChoice // Inclui a escolha do produto aqui
    };

    fetch('https://api.sheetmonkey.io/form/nAgMX6GjWHZpsrWrD5ZrtC', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData) // Usa formData que agora inclui a escolha do produto
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
};

document.querySelector('form').addEventListener('submit', handleSubmit);