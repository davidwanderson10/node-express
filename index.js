import express from 'express';
import { connectToDatabase } from './models/index.js'; // Importando a função de conexão e o modelo Users
import usersRoutes from './routes/usersRoutes.js'; // Importando as rotas de usuários
import categoriesRoutes from './routes/CategoriesRoutes.js'; // Importando as rotas de categorias
const app = express();
const port = 3000;

app.use(express.json()); // Middleware para aceitar JSON no corpo das requisições

await connectToDatabase(); // Conectando ao banco de dados

app.use('/usuarios', usersRoutes); // Usando as rotas de usuários
app.use('/categorias', categoriesRoutes); // Usando as rotas de categorias

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
