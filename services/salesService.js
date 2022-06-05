const salesModel = require('../models/salesModel');

const objectErrorNotFound = { status: 404, message: 'Sale not found' };
const salesProductsModel = require('../models/salesProductsModel');
const actualizeItems = require('../utils');

const getAll = async () => salesModel.getAll();

const getById = async ({ id }) => {
  const [rows] = await salesModel.getById(id);
  if (!rows[0]) throw objectErrorNotFound;
  return rows;
};

const add = async (sales) => {
  await actualizeItems.addItem(sales);
  const { id } = await salesModel.add();

  const registeredSales = await Promise.all(sales
    .map((sale) => salesProductsModel.add(id, sale)));

  return { id, itemsSold: registeredSales };
};

const update = async ({ id }, sales) => {
  const [rows] = await salesModel.getAllSaleById(id);
  
  if (!rows[0]) throw objectErrorNotFound;
  await actualizeItems.updateItem(id, sales);
  
  const editedSales = await Promise.all(sales
    .map((sale) => salesProductsModel.update(id, sale)));

  return { saleId: id, itemUpdated: editedSales };
};

const deleteProduct = async ({ id }) => {
  const [rows] = await salesModel.getAllSaleById(id);  
  if (!rows[0]) throw objectErrorNotFound;

  await actualizeItems.deleteItem(id);
  await salesModel.deleteProduct(id);
  await salesProductsModel.deleteProduct(id);
  return true;
};

module.exports = { getAll, getById, add, update, deleteProduct };
