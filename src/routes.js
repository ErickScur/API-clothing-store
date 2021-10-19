const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const BrandController = require('./controllers/BrandController');
const ProductController = require('./controllers/ProductController');
const ImageController = require('./controllers/ImageController');
const storeData = require('./storeData/storeData');

//! User
routes.get('/users', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.store);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);
routes.get('/confirm/:uuid', UserController.confirmMail);

//!Category
routes.get('/categories', CategoryController.index);
routes.get('/category/:slug', CategoryController.show);
routes.post('/category',CategoryController.store);
routes.put('/category/:id', CategoryController.update);
routes.delete('/category/:id', CategoryController.destroy);

//!Brand
routes.get('/brands', BrandController.index);
routes.post('/brand', BrandController.store);
routes.get('/brand/:slug', BrandController.show);
routes.put('/brand/:id', BrandController.update);
routes.delete('/brand/:id', BrandController.destroy);

//!Product
routes.get('/products/:page?', ProductController.index);
routes.post('/product', ImageController.upload.array('files'), ProductController.store);
routes.get('/product/:slug', ProductController.show);
routes.delete('/product/:id', ProductController.destroy);
routes.put('/product/:id', ProductController.update);

//!Images
routes.get('/images/:productId', ImageController.getImages);

//!Local config
routes.post('/updateconfigs', storeData.updateData);
routes.get('/getconfigs', storeData.getData);

module.exports = routes;