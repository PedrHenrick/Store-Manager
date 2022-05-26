const connection = require('../database/connection');

const getAll = () => {
  const query = 'SELECT * FROM sales';
  return connection.execute(query);
};

module.exports = {
  getAll,
};