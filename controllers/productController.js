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

module.exports = router;
