const express = require('express/');
const productController = require('../controllers/productController');
const { validateProduct, validateLengthProduct } = require('../middlewares/validateProduct');

const productRouter = express.Router();

productRouter.use(express.json());

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post('/', validateProduct, validateLengthProduct, productController.add);
productRouter.put('/:id', validateProduct, validateLengthProduct, productController.update);

module.exports = productRouter;
