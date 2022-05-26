const productModel = require('../models/productModel');

const get = async () => productModel.getAll();

module.exports = {
  get,
};
