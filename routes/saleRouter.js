const express = require('express/');
const salesController = require('../controllers/salesController');

const saleRouter = express.Router();

saleRouter.get('/', salesController.getAll);
saleRouter.get('/:id', salesController.getById);

module.exports = saleRouter;
