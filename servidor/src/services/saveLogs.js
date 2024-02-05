const fs = require('node:fs');

async function saveLogs(requester, data){
    const date = Date(Date.now())
    const logsFromServer = {
        "Data": date,
        "Usuário": data.body.email,
        "rota": requester
    }; let logsArray = [];

    try {
        const fileContent = fs.readFileSync('../logs-servidor.json');
        logsArray = fileContent ? JSON.parse(fileContent) : null;

        logsArray.push(logsFromServer)
        fs.writeFileSync('../logs-servidor.json', JSON.stringify(logsArray, null, 2));
        console.log(data.body);
    } catch (error) {
        console.error(`Erro na leitura de arquivo: ${error.message}`)
    }
}

module.exports = saveLogs;  