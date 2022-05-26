const express = require('express');
const salesService = require('../services/salesService');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await salesService.get();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ Error: 'Erro interno' });
  }
});

module.exports = router;
