const jwt = require('jsonwebtoken');

class tokenService {
    constructor(secrectKey){
        this.secrectKey = secrectKey;
    }

    //Verificando a autencidade do Token
    verifyToken(payLoad){
        // const token = req.headers['authorization'];
        // if(!token){
        //     res.status(401).json({ msg: 'Token não encontrado' })
        // }
    
        // jwt.verify(token, SECRET_KEY)
    
        // next();
        console.log(payLoad)
    }        

    userAsign(user){

    }
}

module.exports = tokenService;