const express = require('express');
const productService = require('../services/productService');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await productService.get();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ Error: 'Erro interno' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await productService.get();
    
    const row = rows.find((product) => product.id === +id); 
    
    if (!row) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(row);
  } catch (err) {
    res.status(500).json({ Error: 'Erro interno' });
  }
});

module.exports = router;
