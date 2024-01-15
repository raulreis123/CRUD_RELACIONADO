const crypto = require('crypto');

/** 
 * @type function
 * @desc função para fazer cálculo de hash em senhas
 * @access public 
*/
async function hashCode(data){
    let hash = crypto.createHash('SHA-256').update(data).digest('hex');
    return hash;
}

module.exports = hashCode;