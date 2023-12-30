//Conexão e model de usuário 
const User = require('../database/models/user');
const Posts = require('../database/models/postagens');
//const sequelize = require('../models/db');

class CrudOperations {
    async getUsers(){
        try{
            const usuarios = await User.findAll();
            return usuarios;
        }catch(error){
            console.error('Erro durante operação: ' + Error)
            throw error;
        }
    }

    async deleteUser(id){
        try{
            const user = await User.findByPk(id);

            if(!user){
                throw new Error('Usuário não encontrado ou inexistente');
            }
            await user.destroy();
            return { 
                status: 200, 
                success: true, 
                msg: 'Usuário excluído com sucesso' };
        } catch (error) {
            console.error('Erro durante operação: ' + error);
            throw error;
        }
    }

    async cadUser(data){
        try {
            await User.create(data)
            return {
                status: 200,
                erro: false,
                success: true,
                msg: 'Usuário cadastrado'
            }
        }
        catch(error) {
            console.error('Erro na operação: ' + error)
            return {
                status: 400,
                erro: true,
                success: false,
                msg: 'Erro ao cadastrar usuário'
            }
        }
    }

    async upUser(id, newUser){ 
        try {
            const user = await User.findByPk(id);

            if(!user){
                throw new Error('Usuário não encontrado');
            }

            const { nome, senha } = newUser;

            user.nome = nome;
            user.senha = senha;
            console.log(`atualizado nome: ${nome}, senha: ${senha}`);
            await user.save();
            return{
                status: 200,
                erro: false,
                success: true,
                msg: 'Usuário atualizado com sucesso.'
            }
        } catch (error) {
            return{
                status: 500,
                erro: error,
                success: false,
                msg: 'Erro ao atualizar usuário.'
            }
        }
    }


    //Funções relacionadas as postagens
    async cadPost(data){
        try {
            const response = User.findByPk(data.usuario_id)

            if(!response){
                console.log('Erro em post 404.');
                return {
                    status: 404,
                    success: false,
                    error: true,
                    msg: 'Usuário não encontrado ou inexistente'
                };
            }

            await Posts.create(data)
            return {
                status: 200,
                erro: false,
                success: true,
                msg: 'Postagem cadastrada!'
            }
        }
         catch(error) {
            console.error('Erro na operação: ' + error)
            return {
                status: 400,
                erro: true,
                success: false,
                msg: 'Erro ao cadastrar postagem'
            }
        }
    }

    async getPost(){
        try {
            const posts = await Posts.findAll();
            return{
                status: 200,
                success: true,
                erro: false,
                msg: 'Postagens encontradas.',
                data: posts
            }
        } catch (error) {
            console.error('Erro durante operação: ' + Error)
            //throw error;
            return{
                status: 500,
                success: false,
                erro: true,
                msg: 'Erro durante operação' + error
            }
        }
    }

    async deletePost(id){
        try {
            let post = await Posts.findByPk(id);

            if(!post){
                //throw new Error('Postagem não enconstrada ou inxistente')
                return{
                    status: 404,
                    success: false,
                    erro: true,
                    msg: 'Postagem não enconstrada ou inxistente'
                }
            }

            await post.destroy();
            return { 
                status: 200,
                success: true,
                erro: false,
                msg: 'Postagem apagada com sucesso'
            }
        } catch (error) {
            console.error(error);
            return{ 
                status: 500,
                success: false,
                erro: true,
                msg: 'Erro no servidor'
            }
        }
    }
}

module.exports = CrudOperations;