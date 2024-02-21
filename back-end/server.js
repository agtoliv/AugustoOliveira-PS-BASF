const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Permite que o servidor entenda JSON

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

app.listen(port, () => {
    console.log(`Servidor ouvindo em http://localhost:${port}`);
});

const { db } = require('./firebaseConfig');

app.post('/submit-form', (req, res) => {
    const userData = req.body;

    db.collection('users').add(userData)
    .then(() => res.send('Dados enviados com sucesso!'))
    .catch(error => res.status(400).send(error.message));
});
