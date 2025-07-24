import Category from '../models/Category.js';

const getAllCategories = async (req, res) => {
    try {
        const categoriesAll = await Category.findAll({ attributes: ['id', 'name'] }) // Buscando todos as categorias
        res.status(200).json(categoriesAll); // Enviando status 200 e a lista de categorias como resposta
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).send('Erro ao buscar categorias');
    }
}

const getCategory = async (req, res) => {
    try {
        const id = req.params.id; // Obtendo o ID da categoria a ser buscado
        const category = await Category.findOne({ attributes: ['id', 'name'], where: {id: id}}) // Buscando categoria pelo ID
        // const user = await Users.findByPk(id, { attributes: ['name', 'email', 'role']}) // Buscando usuário pelo ID
        // const user = await Users.findAll({ attributes: ['name', 'email', 'role'], where: {id: id}}) // Buscando usuário pelo ID
        
        res.status(200).json(category); // Enviando status 200 e os dados da categoria como resposta
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        res.status(500).send('Erro ao buscar categoria');
    }
}

const createCategory = async (req, res) => {
    try {
        
        if(!req.body.name ) {
            return res.status(400).send({message: 'Dados incompletos para criar categoria'}); // Retornando 400 se os dados estiverem incompletos
        }
        
        const categoria = await Category.create({name: req.body.name }); // Criando uma nova categoria com os dados do corpo da requisição
        res.status(200).json(categoria); // Enviando status 200 e os dados do categoria criado como resposta

    } catch (error) {
        console.error('Erro ao cadastrar categoria:', error);
        res.status(500).send('Erro ao cadastrar categoria');
    }
}

const updateCategory = async (req, res) => {
    try {
        
        if(!req.body.name ) {
            return res.status(400).send({message: 'Dados incompletos para alterar categoria'}); // Retornando 400 se os dados estiverem incompletos
        }

        const id = req.params.id; // Obtendo o ID da categoria a ser atualizado
        const categoria = await Category.findByPk(id); // Buscando a categoria pelo ID
        if (!categoria) {
            return res.status(404).send({message: 'Categoria não encontrada'}); // Retornando 404 se a categoria não existir
        }
        await categoria.update({name: req.body.name }); // Atualizando os dados da categoria
        res.status(200).json(categoria); // Enviando status 200 e os dados atualizados da categoria como resposta
        
    } catch (error) {
        console.error('Erro ao alterar categoria:', error);
        res.status(500).send({message: 'Erro ao alterar categoria'});
    }
}

const deleteCategory = async (req, res) => {
    try {

        const id = req.params.id; // Obtendo o ID da categoria a ser atualizado
        const categoria = await Category.findByPk(id); // Buscando a categoria pelo ID
        if (!categoria) {
            return res.status(404).send({message: 'Categoria não encontrado'}); // Retornando 404 se a categoria não existir
        }

        await categoria.destroy(); // Deletando o categoria
        // await Users.destroy({where: {id: id}}); // Deletando a categoria pelo ID
        res.status(200).json({message: 'Categoria deletada com sucesso!'}); // Enviando status 200 e os dados atualizados da categoria como resposta
        
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        res.status(500).send({message: 'Erro ao deletar categoria'});
    }
}

export default {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}