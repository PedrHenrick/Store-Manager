const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const [sales] = await salesService.getAll();
  console.log('sales=> ', sales);
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const sale = await salesService.getById(req.params);  
  return res.status(200).json(sale);
};

const add = async (req, res) => {
  const sale = await salesService.add(req.body);
  return res.status(201).json(sale);
};

const update = async (req, res) => {
  const sale = await salesService.update(req.params, req.body);
  return res.status(200).json(sale);
};

const deleteProduct = async (req, res) => {
  await salesService.deleteProduct(req.params);
  return res.status(204).end();
};

module.exports = { getAll, getById, add, update, deleteProduct };
