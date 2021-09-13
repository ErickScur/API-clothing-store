const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('user',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zipcode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    street: {
        type: Sequelize.STRING,
        allowNull: false
    },
    number: {
        type: Sequelize.STRING,
        allowNull: true
    },
    complement: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isVerified:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    uuid:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

User.sync({force:false}).then(()=>{});
module.exports = User;