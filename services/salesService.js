const salesModel = require('../models/salesModel');

const get = async () => salesModel.getAll();

module.exports = {
  get,
};
