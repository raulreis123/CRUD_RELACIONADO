const express = require('express');
const router = express.Router();
const CrudOperations = require('../services/crudClass');
const CacheMethods = require('../services/nodeCache');
const FsModule = require('../services/fs');
const hashCode = require('../services/hashFunction')

const cacheInstance = new CacheMethods();
const crudInstance = new CrudOperations();
const fsInstance = new FsModule();


/**
 * @route   GET http.../users/dados
 * @desc    Pegar dados de usuário
 * @access  Private
 */
router.get('/dados', async(req,res)=>{
    try {
        const data = await crudInstance.getUsers();
        res.send(data); 
    } catch (error) {
        console.error('erro na obtenção de usuário' + error)
    }
})


/**
 * @route   POST http.../users/registro
 * @desc    Registrar novo usuário
 * @access  Public
 */
router.post('/registro', async(req, res)=>{
    const user = req.body;
    hashCode(user.senha).then(hash=> {user.senha = hash})
    
    const response = await crudInstance.cadUser(user); 
    res.status(response.status).send(response.msg)
})


/**
 * @route   POST http.../users/login
 * @desc    Autenticar login
 * @access  Public
 */
router.post('/login', async(req, res)=>{
    const user = req.body;
    console.log(user);
    try {
        const users = await crudInstance.getUsers();
        hashCode(user.senha).then(hash =>{ user.senha = hash; })

        const userFound = users.find(item => 
            item.email === user.email
        )

        if(userFound){
            if(hashPass === userFound.senha){
                const obj = userFound;
                res.status(200).json({   
                        acess: true,
                        msg: 'Acesso permitido',
                        data: obj
                    });
            } else{ 
                res.status(401).json({
                    acess: false,
                    msg: 'Senha incorreta',
                }) 
            }
        } else{
            res.status(404).json({
                acess: false,
                msg: 'usuário não encontrado'
            })
        }
    } catch (error) {
        console.error('Erro encontrado: ' + error)
        res.status(500).json({
            msg: 'Erro interno do servidor'
        })
    }
})


/**
 * @route   DELETE http.../users/delete
 * @desc    Apagar registro de usuário
 * @access  Public
 */
router.delete('/delete', async(req, res)=>{
    try {
        const userId = req.query.id;

        if (!userId) {
            res.status(400).json({
                success: false,
                error: true,
                msg: 'O parâmetro "id" é obrigatório na consulta.'
            });
        }

        const response = await crudInstance.deleteUser(userId);

        if(response.success){
            res.status(response.status).json({
                success: true,
                msg: 'Usuário excluido'
            })
        } else{ 
            res.status(404).json({
                success: false,
                erro: true,
                msg: 'Usuário não encontrado'
            }) 
          } 
    } catch (error) {
        console.error('Erro ao excluir usuário: ' + error)
        return res.status(500).json({
            erro: true,
            msg: 'Erro interno ao excluir usuário'
        })
    }
})


/**
 * @route   POST http.../users/sendData
 * @desc    Enviar dados de usuário para o servidor
 * @access  Private
 */
router.post('/sendData', async(req, res)=>{
    var userData = req.body;
    console.log(Object.values(userData))
    cacheInstance.setItem(userData);
    res.status(200).json({msg:'dados enviados'})
})


/**
 * @route   GET http.../users/index
 * @desc    Pegar dados de usuário mantidos temporariamente no servidor
 * @access  Private
 */
router.get('/index', async(req, res)=>{
    try {
        var response = await cacheInstance.getItem();

        if( response == null ){
            res.status(404).json({
                success: false,
                msg: 'Os dados expiraram ou não existem'
            })
        } else { 
            res.status(200).json(
                { success: true, msg: 'Usuário encontrado', data: response}
            )
        }
    } catch ( error ) {
        res.status(500).json({
            success: false,
            msg: 'Erro ao capturar dados' + error.message
        })
    }
})


/**
 * @route   PATCH http.../users/update
 * @desc    Atualizar dados de usuário
 * @access  Public
 */
router.patch('/update', async( req, res )=>{
    const userId = req.query.id
    const data = req.body;
    hashCode(data.senha).then(hash =>{data.senha = hash});
    const result = await crudInstance.upUser(userId, data);

    if ( result && result.success ){
        res.status(result.status).json(result.msg);
    } else{ res.status(result.status).json(result.msg); }
})





/** @Rotas relacionadas as postagens */


/**
 * @route   POST http.../users/cadPost
 * @desc    Cadastrar novas postagens
 * @access  Public
 */
router.post('/cadPost', async (req, res)=>{
    const userData = req.body;
    const result = fsInstance.writeFile(userData.imagem);
    console.log(`Objeto retornado: ${result.data}`)

    if( result.success ){
        userData.imagem = result.data;
    } else{
        res.status(500).json(result.msg);
    }

    const response = await crudInstance.cadPost(userData);
    res.status(response.status).json(response.msg)
})


/**
 * @route   GEST http.../users/getPost
 * @desc    Pegar dados das postagens
 * @access  Private
 */
router.get('/getPost', async(req, res)=>{
    let data = await crudInstance.getPost();

    if(!data.success){
        res.status(data.status).send(data.msg)
    } else{ 
        const resposta = data.data.map(postagem =>({
            id: postagem.id,
            titulo: postagem.titulo,
            tipo: postagem.tipo,
            imagem: postagem.imagem ? fsInstance.renderFile(postagem.imagem) : null,
            conteudo: postagem.conteudo,
            usuario_id: postagem.usuario_id
        }));
        //console.log(resposta)
        res.status(200).send(resposta);
     }
})


/**
 * @route   delete http.../users/deletePost
 * @desc    Apagar postagem
 * @access  Public
 */
router.delete('/deletePost', async(req, res)=>{
    const postId = req.query.id;
    console.log(postId)
    const response = await crudInstance.deletePost(postId);

    res.status(response.status).json(response.msg);
})

module.exports = router;