document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const formData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value
    };

    // Certifique-se de que a URL é absoluta e correta
    fetch('http://localhost:5500/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // ou response.json() se o servidor responder com JSON
    })
    .then(data => {
        alert('Formulário enviado com sucesso! Resposta: ' + data);
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
});

import cors from 'cors';
app.use(cors());

