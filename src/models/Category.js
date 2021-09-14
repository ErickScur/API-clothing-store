const Sequelize = require('sequelize');
const connection = require('../database/database');

const Category = connection.define('category',{
    name:{
        type: Sequelize.STRING,
        allowNull : false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

Category.sync({force:false}).then(()=>{});
module.exports = Category;