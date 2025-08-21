import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota de registro
app.post("/register", async (req, res) => {
  const { name, email, senha, telefone, endereço, cidade, estado } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        senha: hashedPassword,
        telefone,
        endereço,
        cidade,
        estado,
      },
    });

    res.status(201).json({ message: "Usuário registrado com sucesso!", user });
  } catch (err) {
    res.status(400).json({ error: "Erro ao registrar usuário", details: err });
  }
});

// Rota de login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) return res.status(401).json({ error: "Senha inválida" });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "segredo123",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login realizado com sucesso!", token });
  } catch (err) {
    res.status(500).json({ error: "Erro no login", details: err });
  }
});

app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});
