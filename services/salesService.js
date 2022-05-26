const salesModel = require('../models/salesModel');
const { serializeSale } = require('../utils');

const get = async (id = null) => {
  if (id) {
    const [rows] = await salesModel.getById(id);
    if (rows.length === 0) return undefined;
    return rows;
  }
  
  const [rows] = await salesModel.getAll();
  const sales = rows.map((row) => serializeSale(row));
  return sales;
};

module.exports = {
  get,
};
