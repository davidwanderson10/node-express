import express from 'express';
import categoriesController from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/', categoriesController.getAllCategories); // Rota para retornar categorias
router.get('/:id', categoriesController.getCategory); // Rota para retornar dados de uma categoria específico
router.post('/', categoriesController.createCategory); // Rota para criar categorias
router.put('/:id', categoriesController.updateCategory); // Rota para alterar categorias
router.delete('/:id', categoriesController.deleteCategory); // Rota para deletar categorias

export default router; // Exportando o roteador para ser usado no arquivo principal