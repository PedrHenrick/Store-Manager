const express = require('express');

const router = express.Router();

router.use('/products', require('../controllers/productController'));
router.use('/sales', require('../controllers/salesController'));

module.exports = router;