const express = require('express/');
const salesController = require('../controllers/salesController');
const { validateSale, validateLengthSale } = require('../middlewares/validateSale');

const saleRouter = express.Router();

saleRouter.use(express.json());

saleRouter.get('/', salesController.getAll);
saleRouter.get('/:id', salesController.getById);
saleRouter.post('/', validateSale, validateLengthSale, salesController.add);
saleRouter.put('/:id', validateSale, validateLengthSale, salesController.update);
saleRouter.delete('/:id', salesController.deleteProduct);

module.exports = saleRouter;
