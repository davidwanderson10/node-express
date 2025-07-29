import Books from '../models/Books.js';

const getAllBooks = async (req, res) => {
    try {
        const booksAll = await Books.findAll() // Buscando todos os livros
        res.status(200).json(booksAll); // Enviando status 200 e a lista de livros como resposta
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        res.status(500).send('Erro ao buscar livros');
    }
}

const getBook = async (req, res) => {
    try {
        const id = req.params.id; // Obtendo o ID do livro a ser buscado
        const livro = await Books.findOne({ where: {id: id}}) // Buscando livros pelo ID
        
        res.status(200).json(livro); // Enviando status 200 e os dados do livro como resposta
    } catch (error) {
        console.error('Erro ao buscar livro:', error);
        res.status(500).send('Erro ao buscar livro');
    }
}

const createBooks = async (req, res) => {
    try {

        const { category_id, title, author, description, published_date, available } = req.body; // Desestruturando os dados do corpo da requisição
        
        // middleware para verificar se os dados necessários estão presentes
        if(!category_id || !title || !author || !description || !published_date) {
            return res.status(400).send({message: 'Dados incompletos para criar um novo livro'}); // Retornando 400 se os dados estiverem incompletos
        }
        
        const livro = await Books.create({
            category_id,
            title,
            author,
            description,
            published_date,
            available: available || true // Definindo 'available' como true por padrão se não
        }); // Criando um novo livro com os dados do corpo da requisição
        res.status(200).json(livro); // Enviando status 200 e os dados do livro criado como resposta

    } catch (error) {
        console.error('Erro ao cadastrar livro:', error);
        res.status(500).send('Erro ao cadastrar livro');
    }
}

const updateBooks = async (req, res) => {
    try {

        const { category_id, title, author, description, published_date, available } = req.body; // Desestruturando os dados do corpo da requisição
        
        // middleware para verificar se os dados necessários estão presentes
        if(!category_id || !title || !author || !description || !published_date) {
            return res.status(400).send({message: 'Dados incompletos para criar um novo livro'}); // Retornando 400 se os dados estiverem incompletos
        }

        const id = req.params.id; // Obtendo o ID do livro a ser atualizado
        const livro = await Books.findByPk(id); // Buscando o livro pelo ID
        if (!livro) {
            return res.status(404).send({message: 'Livro não encontrado'}); // Retornando 404 se o livro não existir
        }
        await livro.update({
            category_id,
            title,
            author,
            description,
            published_date,
            available: available || true }); // Atualizando os dados do livro

        res.status(200).json(livro); // Enviando status 200 e os dados atualizados do livro
        
    } catch (error) {
        console.error('Erro ao alterar livro:', error);
        res.status(500).send({message: 'Erro ao alterar livro'});
    }
}

const deleteBooks = async (req, res) => {
    try {

        const id = req.params.id; // Obtendo o ID do livro a ser atualizado
        const livro = await Books.findByPk(id); // Buscando o livro pelo ID
        if (!livro) {
            return res.status(404).send({message: 'Livro não encontrado'}); // Retornando 404 se o livro não existir
        }

        await livro.destroy(); // Deletando o livro
        // await Users.destroy({where: {id: id}}); // Deletando o livro
        res.status(200).json({message: 'Livro deletado com sucesso!'}); // Enviando status 200
        
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        res.status(500).send({message: 'Erro ao deletar livro'});
    }
}

export default {
    getAllBooks,
    getBook,
    createBooks,
    updateBooks,
    deleteBooks
}