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

const update = async (id, { name, quantity }) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';
  
  await connection.execute(query, [name, quantity, id]);
  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  add,
  update,
};