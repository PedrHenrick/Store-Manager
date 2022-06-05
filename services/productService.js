const productModel = require('../models/productModel');
const objectErrorNotFound = { status: 404, message: 'Product not found' };
const objectErrorAlreadyExists = { status: 409, message: 'Product already exists' };

const get = async (id = null) => {
  const [rows] = await productModel.getAll();

  if (id) {
    const row = rows.find((product) => product.id === +id);
    
    if (!row) throw objectErrorNotFound;
    return row;
  }
  return rows;
};

const add = async (newProduct) => {
  const [rows] = await productModel.getAll();
  const row = rows.find((product) => product.name === newProduct.name);

  if (!row) return productModel.add(newProduct);
  throw objectErrorAlreadyExists;
};

const update = async (id, newProduct) => {
  const [rows] = await productModel.getAll();
  const row = rows.find((product) => product.id === +id);

  if (!row) throw objectErrorNotFound;
  return productModel.update(id, newProduct);
};

const deleteProduct = async (id) => {
  const [rows] = await productModel.getAll();
  const row = rows.find((product) => product.id === +id);

  if (!row) throw objectErrorNotFound;
  return productModel.deleteProduct(id);
};

module.exports = {
  get,
  add,
  update,
  deleteProduct,
};
