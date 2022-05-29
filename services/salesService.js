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

const update = async (id, sales) => {
  const [rows] = await salesModel.getAllSale();

  const verify = rows.find((row) => row.id === +id);

  console.log(rows);

  if (!verify) return undefined;

  const editedSales = await Promise.all(sales
  .map((sale) => salesProductsModel.update(id, sale)));
  
  return {
    saleId: id,
    itemUpdated: editedSales,
  };
};

module.exports = {
  get,
  add,
  update,
};
