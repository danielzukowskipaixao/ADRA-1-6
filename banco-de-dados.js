import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Conexão com MySQL
const db = mysql.createConnection({
  host: 'localhost', // ou seu host online
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco'
});

db.connect(err => {
  if (err) {
    console.error('Erro na conexão:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

// Rota de exemplo
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});