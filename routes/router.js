const express = require('express');

const router = express.Router();

router.use('/products', require('./productRouter'));
router.use('/sales', require('./saleRouter'));

module.exports = router;