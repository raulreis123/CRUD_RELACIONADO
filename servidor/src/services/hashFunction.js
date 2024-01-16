/** 
 * @type function
 * @desc função para fazer cálculo de hash em senhas
 * @access public 
*/
const crypto = require('crypto');

async function hashCode(data){
    let hash = crypto.createHash('SHA-256').update(data).digest('hex');
    return hash;
}

module.exports = hashCode;