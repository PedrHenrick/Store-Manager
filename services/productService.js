const productModel = require('../models/productModel');

const get = async (id = null) => {
  const [rows] = await productModel.getAll();
  
  if (id) {
    const row = rows.find((product) => product.id === +id);
    return row;
  }
  return rows;
};

const add = async (newProduct) => {
  const [rows] = await productModel.getAll();

  const row = rows.find((product) => product.name === newProduct.name);

  if (!row) {
    return productModel.add(newProduct);
  }
  return undefined;
};

const update = async (id, newProduct) => {
  const [rows] = await productModel.getAll();

  const row = rows.find((product) => product.id === +id);

  if (!row) {
    return undefined;
  }
  return productModel.update(id, newProduct);
};

module.exports = {
  get,
  add,
  update,
};
