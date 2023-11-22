const sequelize = require('./db');
const DataTypes = require('sequelize');
const User = require('./user');

const Postagem = sequelize.define('postagens', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    tipo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conteudo: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
}, { timestamps: false })

//Define a relação entre tabelas, onde cada postagem pertence a um usuário (Autor) 
Postagem.belongsTo(User, { as: 'Autor', foreignKey: 'usuario_id' });

module.exports = Postagem;