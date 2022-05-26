const express = require('express');
const productService = require('../services/productService');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const products = await productService.get();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ Error: 'Erro interno' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.get(id);
    
    if (!product) res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ Error: 'Erro interno' });
  }
});

module.exports = router;
