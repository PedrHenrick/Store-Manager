const connection = require('../database/connection');

const getAll = () => connection.execute('SELECT * FROM products');

const getById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [+id]);

const add = async ({ name, quantity }) => {
  const [row] = await connection.execute(`INSERT INTO products (name, quantity)
  VALUES (?, ?)`, [name, quantity]);
  return { id: row.insertId, name, quantity };
};

const update = async (id, { name, quantity }) => {
  await connection.execute(`UPDATE products 
  SET name = ?, quantity = ? WHERE id = ?`, [name, quantity, id]);
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return { id };
};

module.exports = { getAll, getById, add, update, deleteProduct };
