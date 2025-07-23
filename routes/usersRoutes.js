import express from 'express';
import usersController from '../controllers/usersController.js';

const router = express.Router();

router.get('/', usersController.getAllUsers); // Rota para retornar usuários
router.post('/', usersController.createUsers); // Rota para retornar usuários

export default router; // Exportando o roteador para ser usado no arquivo principal