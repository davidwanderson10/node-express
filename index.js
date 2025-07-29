import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './models/index.js'; // Importando a função de conexão e o modelo Users
import usersRoutes from './routes/usersRoutes.js'; // Importando as rotas de usuários
import categoriesRoutes from './routes/CategoriesRoutes.js'; // Importando as rotas de categorias
import booksRoutes from './routes/booksRoutes.js'; // Importando as rotas de livros

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Middleware para aceitar JSON no corpo das requisições

await connectToDatabase(); // Conectando ao banco de dados

app.use('/usuarios', usersRoutes); // Usando as rotas de usuários
app.use('/categorias', categoriesRoutes); // Usando as rotas de categorias
app.use('/livros', booksRoutes); // Usando as rotas de livros

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
