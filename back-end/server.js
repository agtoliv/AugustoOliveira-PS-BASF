const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5500;
const db = new sqlite3.Database('./database.db');

app.use(bodyParser.json());

// Criação da tabela (se não existir)
const initDb = () => {
    db.run(`CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT,
    lastname TEXT,
    email TEXT,
    tel TEXT,
    city TEXT,
    description TEXT,
    observations TEXT,
    products TEXT
    )`);
};
initDb();

const cors = require('cors');
app.use(cors());


// Rota para receber dados do formulário
app.post('/submit-form', (req, res) => {
    const { firstname, lastname, email, tel, city, description, observations, products } = req.body;
    const sql = `INSERT INTO submissions (firstname, lastname, email, tel, city, description, observations, products) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [firstname, lastname, email, tel, city, description, observations, products];
    db.run(sql, params, (err) => {
    if (err) {
        console.error(err.message);
        res.status(400).send('Erro ao salvar no banco de dados');
        return;
    }
    res.send('Dados enviados com sucesso');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

db.run(sql, params, (err) => {
    if (err) {
        console.error(err.message);
        res.status(400).send('Erro ao salvar no banco de dados');
        return;
    }
    // Modifique esta linha
    res.json({ message: 'Dados enviados com sucesso' });
});