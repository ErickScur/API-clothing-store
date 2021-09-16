const Sequelize = require('sequelize');
const connection = require('../database/database');
const Product = require('./Product');

const Image = connection.define('images',{
    path:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Image.belongsTo(Product);
Product.hasMany(Image);

Image.sync({force:false}).then(()=>{});
module.exports = Image;

