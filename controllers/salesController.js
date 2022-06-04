const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await salesService.get();
  
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.get(id);

  if (!sale) return res.status(404).json({ message: 'Sale not found' });
  
  return res.status(200).json(sale);
};

const add = async (req, res) => {
  const newSale = req.body;

  const sale = await salesService.add(newSale);
    
  return res.status(201).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const editSale = req.body;

  const sale = await salesService.update(id, editSale);

  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(sale);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.deleteProduct(id);

  if (!result) return res.status(404).json({ message: 'Sale not found' });

  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteProduct,
};
