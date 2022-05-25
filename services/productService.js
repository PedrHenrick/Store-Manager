const productModel = require('../models/productModel');

const get = (id = null) => {
  if (id) {
    return console.log('parei aqui!');
  }
  return productModel.getAll();
};

module.exports = {
  get,
};
