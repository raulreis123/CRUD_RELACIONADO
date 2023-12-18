const fs = require('node:fs');
const path = require('node:path')


class fileSystem {
    writeFile(base64){
        const base64Prefix = 'data:image/png;base64,'; //Prefixo
        const fileName = `${Date.now()}.png`
        const fileWay = path.join(__dirname, '..', '/images');
        let fileFnWay = path.join('/images', fileName);

        //Operação ternária
        const base64Image = base64.startsWith(base64Prefix) ? base64.slice(base64Prefix.length) : ()=>{throw new Error('Formato incorreto')};

        try {
            fs.writeFileSync(path.join(fileWay, fileName), base64Image, 'base64');
            return {
                success: true,
                erro: false,
                msg: 'Arquivo Escrito com sucesso',
                data: fileFnWay
            }
        } catch (error) {
            console.error('Erro encontrado:' + error)
            return {
                success: false,
                erro: true,
                msg: error.msg
            }
        }
    }

    renderFile(imagePath){
        const localDir = path.join(__dirname, '..')
        const filePath = path.join(localDir, imagePath);

        const base64Image = fs.readFileSync(filePath, 'base64');
        return base64Image;
    }
}

module.exports = fileSystem;