import Users from '../models/Users.js';
import bcrypt from 'bcrypt';

const login = async (req, res) => {
    try {

        const { email, password } = req.body; // Desestruturando os dados do corpo da requisição
        // middleware para verificar se os dados necessários estão presentes
        if (!email || !password) {
            return res.status(400).send({ message: 'Email e senha são obrigatórios' }); // Retornando 400 se os dados estiverem incompletos
        }
        // Verificando se o usuário existe
        const user = await Users.findOne({ where: { email: email } }); // Buscando usuário pelo email
        // Case o usuário não exista, retornar 404
        if (!user) {
            return res.status(404).send({ message: 'Email ou senha inválidos' }); // Retornando 404 se o usuário não existir
        }
        // Verificando se a senha está correta (comparando a senha informada com a senha criptografada no banco de dados)
        const passwordValid = await bcrypt.compare(password, user.password); // Verificando se a senha está correta
        // Case a senha esteja incorreta, retornar 401
        if (!passwordValid) {
            return res.status(401).send({ message: 'Email ou senha inválidos' }); // Retornando 401 se a senha estiver incorreta
        } 
        // Se tudo estiver correto, retornar 200 com os dados do usuário
        res.status(200).json({message: 'Login efetuado com sucesso!'}); // Enviando status 200 e os dados do usuário como resposta
    } catch (error) {
        console.error({message: 'Erro ao efetuar o login!'}, error);
        res.status(500).send({message: 'Erro ao efetuar o login!'});
    }
}

const getAllUsers = async (req, res) => {
    try {
        const usersAll = await Users.findAll({ attributes: ['name', 'email', 'role'] }) // Buscando todos os usuários
        res.status(200).json(usersAll); // Enviando status 200 e a lista de usuários como resposta
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro ao buscar usuários');
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id; // Obtendo o ID do usuário a ser buscado
        const user = await Users.findOne({ attributes: ['name', 'email', 'role'], where: {id: id}}) // Buscando usuário pelo ID
        // const user = await Users.findByPk(id, { attributes: ['name', 'email', 'role']}) // Buscando usuário pelo ID
        // const user = await Users.findAll({ attributes: ['name', 'email', 'role'], where: {id: id}}) // Buscando usuário pelo ID
        
        res.status(200).json(user); // Enviando status 200 e os dados do usuário como resposta
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro ao buscar usuários');
    }
}

const createUsers = async (req, res) => {
    try {
        
        if(!req.body.name || !req.body.email || !req.body.role || req.body.name.length < 5 || !req.body.password) {
            return res.status(400).send({message: 'Dados incompletos para criar usuário'}); // Retornando 400 se os dados estiverem incompletos
        }

        // Criptografando a senha antes de salvar no banco de dados
        const saltRounds = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const usuario = await Users.create({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: hashedPassword }); // Criando um novo usuário com os dados do corpo da requisição

        res.status(200).json(usuario); // Enviando status 200 e os dados do usuário criado como resposta

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).send('Erro ao cadastrar usuários');
    }
}

const updateUsers = async (req, res) => {
    try {

        const { name, email, role, password } = req.body; // Desestruturando os dados do corpo da requisição
        
        if(!name || !email || !role || name.length < 5 || !password) {
            return res.status(400).send({message: 'Dados incompletos para alterar usuário'}); // Retornando 400 se os dados estiverem incompletos
        }

        const id = req.params.id; // Obtendo o ID do usuário a ser atualizado
        const usuario = await Users.findByPk(id); // Buscando o usuário pelo ID
        if (!usuario) {
            return res.status(404).send({message: 'Usuário não encontrado'}); // Retornando 404 se o usuário não existir
        }

        // Criptografando a senha antes de salvar no banco de dados
        const saltRounds = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await usuario.update({
            name: name,
            email: email,
            role: role,
            password: hashedPassword }); // Atualizando os dados do usuário
        res.status(200).json(usuario); // Enviando status 200 e os dados atualizados do usuário
        
    } catch (error) {
        console.error('Erro ao alterar usuário:', error);
        res.status(500).send({message: 'Erro ao alterar usuários'});
    }
}

const deleteUsers = async (req, res) => {
    try {

        const id = req.params.id; // Obtendo o ID do usuário a ser atualizado
        const usuario = await Users.findByPk(id); // Buscando o usuário pelo ID
        if (!usuario) {
            return res.status(404).send({message: 'Usuário não encontrado'}); // Retornando 404 se o usuário não existir
        }

        await usuario.destroy(); // Deletando o usuário
        // await Users.destroy({where: {id: id}}); // Deletando o usuário
        res.status(200).json({message: 'Usuário deletado com sucesso!'}); // Enviando status 200 e os dados atualizados do usuário
        
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).send({message: 'Erro ao deletar usuários'});
    }
}

export default {
    login,
    getAllUsers,
    getUser,
    createUsers,
    updateUsers,
    deleteUsers
}