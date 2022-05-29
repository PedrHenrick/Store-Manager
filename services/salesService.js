const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');
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

const add = async (sales) => {
  const { id } = await salesModel.add();
  
  const registeredSales = await Promise.all(sales
  .map((sale) => salesProductsModel.add(id, sale)));
  
  return {
    id,
    itemsSold: registeredSales,
  };
};

module.exports = {
  get,
  add,
};
