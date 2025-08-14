import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configurações de segurança básicas
app.use(helmet()); // Adiciona headers de segurança
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Rate limiting para prevenir ataques de força bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por windowMs
});
app.use(limiter);

app.use(express.json({ limit: '10kb' })); // Limita o tamanho do payload

// Conexão com MySQL usando pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: true
  } : false,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Algo deu errado!'
  });
});

// Exemplo de rota com validação
app.get('/usuarios', 
  // Middleware de autenticação (você precisará implementar)
  checkAuth,
  async (req, res) => {
    try {
      const [rows] = await pool.promise().query(
        'SELECT id, nome, email FROM usuarios'
        // Nunca retorne senhas ou dados sensíveis
      );
      res.json({
        status: 'success',
        data: rows
      });
    } catch (error) {
      console.error('Erro na consulta:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro ao buscar usuários'
      });
    }
});

// Exemplo de rota POST com validação
app.post('/usuarios',
  [
    body('email').isEmail().normalizeEmail(),
    body('nome').trim().isLength({ min: 2, max: 50 }),
    body('senha').isLength({ min: 8 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Implementar lógica de criação de usuário
});

// Inicia o servidor de forma segura
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM recebido. Encerrando servidor...');
  server.close(() => {
    pool.end();
    console.log('Servidor encerrado');
  });
});