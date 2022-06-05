const productModel = require('../models/productModel');

const objectErrorNotFound = { status: 404, message: 'Product not found' };
const objectErrorAlreadyExists = { status: 409, message: 'Product already exists' };

const getAll = () => productModel.getAll();

const getById = async ({ id }) => {
  const [row] = await productModel.getById(id);
  if (!row[0]) throw objectErrorNotFound;
  return row[0];
};

const add = async (newProduct) => {
  const [rows] = await productModel.getAll();
  const row = rows.find((product) => product.name === newProduct.name);

  if (!row) return productModel.add(newProduct);
  throw objectErrorAlreadyExists;
};

const update = async ({ id }, newProduct) => {
  const [row] = await productModel.getById(id);
  if (!row[0]) throw objectErrorNotFound;
  return productModel.update(id, newProduct);
};

const deleteProduct = async ({ id }) => {
  const [row] = await productModel.getById(id);
  if (!row[0]) throw objectErrorNotFound;
  return productModel.deleteProduct(id);
};

module.exports = { getAll, getById, add, update, deleteProduct };
