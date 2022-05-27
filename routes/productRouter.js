const express = require('express/');
const productController = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);

module.exports = productRouter;
