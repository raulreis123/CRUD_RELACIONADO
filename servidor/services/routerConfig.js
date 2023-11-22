const express = require('express');
const router = express.Router();
const CrudOperations = require('./crudClass');
const CacheMethods = require('./nodeCache');
const HashModule = require('./hashFunction');

const hashInstance = new HashModule();
const cacheInstance = new CacheMethods();
const crudInstance = new CrudOperations();

router.get('/dados', async(req,res)=>{
    try {
        const data = await crudInstance.getUsers();
        res.send(data); 
    } catch (error) {
        console.error('erro na obtenção de usuário' + error)
    }
})

router.post('/registro', async(req, res)=>{
    const user = req.body;
    let hash = await hashInstance.hashCode(user.senha);
    console.log(hash);
    user.senha = hash;    
    const response = await crudInstance.cadUser(user); 
    if(!response){
        res.status(response.status).send(response.msg)
    } else{
        res.status(response.status).send(response.msg)
    }
})

router.delete('/delete', async(req, res)=>{
    try {
        const userId = req.query.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                error: true,
                msg: 'O parâmetro "id" é obrigatório na consulta.'
            });
        }

        const response = await crudInstance.deleteUser(userId);

        if(response.success){
            return res.status(response.status).json({
                success: true,
                msg: 'Usuário excluido'
            })
        } else{ 
            return res.status(404).json({
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

router.post('/sendData', async(req, res)=>{
    var userData = req.body;
    console.log(Object.values(userData))
    cacheInstance.setItem(userData);
    res.status(200).json({msg:'dados enviados'})
  })
  
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
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Erro ao capturar dados' + error.message
        })
    }
})

router.patch('/update', async(req, res)=>{
    const userId = req.query.id
    const data = req.body;
    data.senha = await hashInstance.hashCode(data.senha);
    const result = await crudInstance.upUser(userId, data);

    if(result && result.success){
        res.status(result.status).json(result.msg);
    } else{ res.status(result.status).json(result.msg); }
})



//Rotas relacionadas as postagens
router.post('/cadPost', async(req, res)=>{
    const userData = req.body;
    const response = await crudInstance.cadPost(userData);
    res.status(response.status).json(response.msg)
})

router.get('/getPost', async(req, res)=>{
    let data = await crudInstance.getPost();
    if(!data.success){
        res.status(data.status).send(data.msg)
    } else{ res.status(data.status).send(data) }
})

router.delete('/deletePost', async(req, res)=>{
    const postId = req.query.id;
    console.log(postId)
    const response = await crudInstance.deletePost(postId);

    res.status(response.status).json(response.msg);
})

module.exports = router;