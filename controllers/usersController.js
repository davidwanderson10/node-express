import Users from '../models/Users.js';

const getAllUsers = async (req, res) => {
    try {
        const usersAll = await Users.findAll({ attributes: ['name', 'email', 'role'] }) // Buscando todos os usuários
        res.status(200).json(usersAll); // Enviando status 200 e a lista de usuários como resposta
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro ao buscar usuários');
    }
}

const createUsers = async (req, res) => {
    try {
        
        if(!req.body.name || !req.body.email || !req.body.role || req.body.name.length < 5 ) {
            return res.status(400).send({message: 'Dados incompletos para criar usuário'}); // Retornando 400 se os dados estiverem incompletos
        }
        
        const usuario = await Users.create({name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: req.body.password }); // Criando um novo usuário com os dados do corpo da requisição
        res.status(200).json(usuario); // Enviando status 200 e os dados do usuário criado como resposta

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).send('Erro ao cadastrar usuários');
    }
}

export default {
    getAllUsers,
    createUsers
}