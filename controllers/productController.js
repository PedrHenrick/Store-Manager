const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const products = await productService.get();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.get(id);
  
  if (!product) return res.status(404).json({ message: 'Product not found' });
  
  return res.status(200).json(product);
};

const add = async (req, res) => {
  const newProduct = req.body;

  const newPost = await productService.add(newProduct);
  
  if (!newPost) return res.status(409).json({ message: 'Product already exists' });
  
  return res.status(201).json(newPost);
};

const update = async (req, res) => {
  const { id } = req.params;
  const newProduct = req.body;

  const updatedProduct = await productService.update(id, newProduct);
  
  if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
  
  return res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await productService.deleteProduct(id);

  if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    
  return res.status(204).json();
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteProduct,
};
