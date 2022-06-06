const express = require('express/');
const productController = require('../controllers/productController');
const validateSchema = require('../middlewares/middlewareValidade');
const { schemaProduct } = require('../middlewares/schema');

const productRouter = express.Router();

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post('/', validateSchema(schemaProduct), productController.add);
productRouter.put('/:id', validateSchema(schemaProduct), productController.update);
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
