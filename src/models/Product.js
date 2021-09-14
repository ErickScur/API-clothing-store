const Sequelize = require('sequelize');
const connection = require('../database/database');
const Brand = require('./Brand');
const Category = require('./Category');

const Product = connection.define('product',{
    name:{
        type: Sequelize.STRING,
        allowNull : false
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    sizes:{
        type: Sequelize.STRING,
        allowNull: false
    },
    inventory:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    colors:{
        type: Sequelize.STRING,
        allowNull:false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
});
Product.belongsTo(Category);
Product.belongsTo(Brand);
Category.hasMany(Product);
Brand.hasMany(Product);
Product.sync({force:false}).then(()=>{});
module.exports = Product;