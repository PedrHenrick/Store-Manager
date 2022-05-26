const productModel = require('../models/productModel');

const get = async (id = null) => {
  const [rows] = await productModel.getAll();
  
  if (id) {
    const row = rows.find((product) => product.id === +id);
    return row;
  }
  return rows;
};

module.exports = {
  get,
};
