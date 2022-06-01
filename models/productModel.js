const connection = require('../database/connection');

const getAll = () => {
  const query = 'SELECT * FROM products';
  return connection.execute(query);
};

const add = async ({ name, quantity }) => {
  const query = `INSERT INTO products (name, quantity)
  VALUES (?, ?)`;
  const [row] = await connection.execute(query, [name, quantity]);

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

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  await connection.execute(query, [id]);
  return {
    id,
  };
};

module.exports = {
  getAll,
  add,
  update,
  deleteProduct,
};