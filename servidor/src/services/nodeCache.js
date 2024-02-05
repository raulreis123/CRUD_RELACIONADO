const nodeCache = require('node-cache');
const userCache = new nodeCache();

class CacheMethods{
    async setItem(data){
        userCache.set('keySession', data, 15);
    }

    async getItem(){
        var getData = userCache.get('keySession');
        
        if( getData == undefined ){
            console.log('Os dados expiraram ou não existem no cache.')
        }
        return getData;
    }
}

module.exports = CacheMethods;