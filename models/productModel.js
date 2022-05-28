const connection = require('../database/connection');

const getAll = () => {
  const query = 'SELECT * FROM products';
  return connection.execute(query);
};

const add = async ({ name, quantity }) => {
  const query = `INSERT INTO products (name, quantity)
  VALUES (?, ?)`;
  const [row] = await connection.execute(query, [name, quantity]);
  console.log(row);
  return {
    id: row.insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  add,
};