const express = require('express/');
const salesController = require('../controllers/salesController');
const validateSchema = require('../middlewares/middlewareValidade');
const { schemaSale } = require('../middlewares/schema');

const saleRouter = express.Router();

saleRouter.get('/', salesController.getAll);
saleRouter.get('/:id', salesController.getById);
saleRouter.post('/', validateSchema(schemaSale), salesController.add);
saleRouter.put('/:id', validateSchema(schemaSale), salesController.update);
saleRouter.delete('/:id', salesController.deleteProduct);

module.exports = saleRouter;
