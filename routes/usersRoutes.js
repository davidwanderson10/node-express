import express from 'express';
import usersController from '../controllers/usersController.js';

const router = express.Router();

router.post('/login', usersController.login); // Rota para login de usuários
router.get('/', usersController.getAllUsers); // Rota para retornar usuários
router.get('/:id', usersController.getUser); // Rota para retornar dados de um usuário específico
router.post('/', usersController.createUsers); // Rota para criar usuários
router.put('/:id', usersController.updateUsers); // Rota para alterar usuários
router.delete('/:id', usersController.deleteUsers); // Rota para deletar usuários

export default router; // Exportando o roteador para ser usado no arquivo principal