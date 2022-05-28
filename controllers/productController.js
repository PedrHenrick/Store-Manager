const productService = require('../services/productService');

const error = { Error: 'Erro interno' };

const getAll = async (_req, res) => {
  try {
    const products = await productService.get();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.get(id);
    
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(error);
  }
};

const add = async (req, res) => {
  try {
    const newProduct = req.body;

    const newPost = await productService.add(newProduct);
    
    if (!newPost) return res.status(409).json({ message: 'Product already exists' });
    
    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const newProduct = req.body;

    const updatedProduct = await productService.update(id, newProduct);
    
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    
    return res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productService.deleteProduct(id);

    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteProduct,
};
