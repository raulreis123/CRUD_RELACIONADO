const jwt = require('jsonwebtoken');

class JwtClass {
    constructor(secretKey) {
        this.secretKey = secretKey;
        console.log(`Key: ${secretKey},  Constructor key: ${this.secretKey}`)
    }

    //Verificando a autencidade do Token

    verifyToken = (req, res, next)=>{
        console.log(`Chave: ${this.secretKey}`)
        const headerAuth = req.headers['authorization'];
        const token = headerAuth ? headerAuth.replace(/^Bearer\s/, '') : null;

        if (!token) {
           res.status(401).json({ msg: 'Token inexistente!' })
        }

        try {
            const payload = jwt.verify(token, this.secretKey)
            req.user = payload;
            next();
        } catch (error) {
            console.error(`Erro encontrado: ${error.message}`)
            res.status(401).json({ msg: 'Token invalido' })
        }
    } 

    //Assinatura de token
    userAsign(user){
        console.log(`Secret key in userAsign:  ${this.secretKey}`)
        const returnToken = jwt.sign({ user }, this.secretKey, {
            expiresIn: '1d' 
        });

        return {
            token: returnToken,
            success: true
        }
    }
}

module.exports = JwtClass;