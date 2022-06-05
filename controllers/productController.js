const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const [products] = await productService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const product = await productService.getById(req.params);
  return res.status(200).json(product);
};

const add = async (req, res) => {
  const newPost = await productService.add(req.body);
  return res.status(201).json(newPost);
};

const update = async (req, res) => {
  const updatedProduct = await productService.update(req.params, req.body);  
  return res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params); 
  return res.status(204).json();
};

module.exports = { getAll, getById, add, update, deleteProduct };
