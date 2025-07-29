import express from 'express';
import booksController from '../controllers/booksController.js';

const router = express.Router();

router.get('/', booksController.getAllBooks); // Rota para retornar livros
router.get('/:id', booksController.getBook); // Rota para retornar dados de um livro específico
router.post('/', booksController.createBooks); // Rota para criar livros
router.put('/:id', booksController.updateBooks); // Rota para alterar livros
router.delete('/:id', booksController.deleteBooks); // Rota para deletar livros

export default router; // Exportando o roteador para ser usado no arquivo principal