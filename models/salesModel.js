const connection = require('../database/connection');

const getAll = () => {
  const query = `SELECT DISTINCT sp.sale_id, sp.product_id, sp.quantity, s.date
  FROM sales_products as sp
  INNER JOIN sales s
  ON s.id = sp.sale_id
  ORDER BY sp.sale_id ASC, sp.product_id ASC;`;
  return connection.execute(query);
};

const getAllSale = () => {
  const query = 'SELECT * FROM sales;';
  return connection.execute(query);
};

const getById = (id) => {
  const query = `SELECT s.date, sp.product_id as productId, sp.quantity
  FROM sales_products as sp
  INNER JOIN sales s
  ON s.id = sp.sale_id
  WHERE sp.sale_id = ?
  ORDER BY sp.sale_id ASC, sp.product_id ASC;`;
  return connection.execute(query, [id]);
};

const add = async () => {
  const query = 'INSERT INTO sales (date) VALUES (NOW());';
  const [rows] = await connection.execute(query);

  return {
    id: rows.insertId,
  };
};

module.exports = {
  getAll,
  getAllSale,
  getById,
  add,
};