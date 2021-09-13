const Sequelize = require('sequelize');
const connection = require('../database/database');

const Brand = connection.define('brand',{
    name:{
        type: Sequelize.STRING,
        allowNull : false
    }
});

Brand.sync({force:false}).then(()=>{});
module.exports = Brand;