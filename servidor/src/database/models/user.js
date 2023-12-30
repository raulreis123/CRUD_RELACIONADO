const DataTypes = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('users', {
    id: {
        primaryKey: true,
        autoIncrement: true, //Define o autoincremento
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING, //tipo de dado string
        allowNull: false // o valor não pode ser nulo
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
},  {
    timestamps: false //comando para desativar colunas updateAt e createAt (config padrão do sequelize)
});

module.exports = User; // exportando o modelo pronto