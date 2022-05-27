const productService = require('../services/productService');

const getAll = async (_req, res) => {
  try {
    const products = await productService.get();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ Error: 'Erro interno' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.get(id);
    
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ Error: 'Erro interno' });
  }
};

module.exports = {
  getAll,
  getById,
};
