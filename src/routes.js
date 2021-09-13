const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');

//! Users
routes.get('/users', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.store);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);
routes.get('/confirm/:uuid', UserController.confirmMail);

//!Category
routes.get('/categories', CategoryController.index);
routes.get('/category/:id', CategoryController.show);
routes.post('/category',CategoryController.store);
routes.put('/category/:id', CategoryController.update);
routes.delete('/category/:id', CategoryController.destroy);

module.exports = routes;