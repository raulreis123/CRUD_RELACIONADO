const { Sequelize } = require('sequelize'); //importando o módulo sequelize

const sequelize = new Sequelize('solicita_login', 'root', 'R.mi@52620042005', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate() //verifica a conexao com o bd
.then(()=>{ //tentativa com sucesso 
    console.log('Conexão realizada com sucesso');
}).catch(()=>{ //tentativa sem sucesso
    console.log('Erro: Conexão não realizada')
})

module.exports = sequelize;