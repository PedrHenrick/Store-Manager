const express = require('express/');
const productController = require('../controllers/productController');
const { validateProduct, validateLengthProduct } = require('../middlewares/validateProduct');

const productRouter = express.Router();

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post('/', validateProduct, validateLengthProduct, productController.add);
productRouter.put('/:id', validateProduct, validateLengthProduct, productController.update);
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
