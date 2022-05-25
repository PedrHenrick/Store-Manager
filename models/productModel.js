const connection = require('../database/connection');

const getAll = () => {
  const query = 'SELECT * FROM products';
  return connection.execute(query);
};

module.exports = {
  getAll,
};