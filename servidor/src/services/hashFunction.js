const crypto = require('crypto');

/*class HashFunction {
    async hashCode(data){
        let hash = crypto.createHash('SHA-256').update(data).digest('hex');
        return hash;
    }
}*/

async function hashCode(data){
    let hash = crypto.createHash('SHA-256').update(data).digest('hex');
    return hash;
}

module.exports = hashCode;