const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const products = await productService.get();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.get(id);
  return res.status(200).json(product);
};

const add = async (req, res) => {
  const newProduct = req.body;
  const newPost = await productService.add(newProduct);
  return res.status(201).json(newPost);
};

const update = async (req, res) => {
  const { id } = req.params;
  const newProduct = req.body;
  const updatedProduct = await productService.update(id, newProduct);  
  return res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productService.deleteProduct(id); 
  return res.status(204).json();
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteProduct,
};
