const salesService = require('../services/salesService');

const error = { Error: 'Erro interno' };

const getAll = async (_req, res) => {
  try {
    const sales = await salesService.get();
    
    return res.status(200).json(sales);
  } catch (err) {
    return res.status(500).json(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.get(id);

    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    
    return res.status(200).json(sale);
  } catch (err) {
    res.status(500).json(error);
  }
};

const add = async (req, res) => {
  try {
    const newSale = req.body;

    const sale = await salesService.add(newSale);
    
    if (!sale) return res.status(502).json({ Error: 'Foi recebido valor inválido do servidor' });

    return res.status(201).json(sale);
  } catch (err) {
    console.log(err);
    return res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
};
