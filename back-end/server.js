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
