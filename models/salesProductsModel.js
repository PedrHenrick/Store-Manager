const connection = require('../database/connection');

const getAll = () => connection.execute('SELECT * FROM sales_products');

const add = async (id, { productId, quantity }) => {
  await connection.execute(`INSERT INTO sales_products(sale_id, product_id, quantity) 
  VALUES(?, ?, ?)`, [id, productId, quantity]);
  return { productId, quantity };
};

const update = async (id, { productId, quantity }) => {
  await connection.execute(`UPDATE sales_products SET quantity = ?
  WHERE sale_id = ? AND product_id = ?;`, [quantity, id, productId]);
  return { productId, quantity };
};

const deleteProduct = (id) => connection.execute(`DELETE FROM sales_products 
WHERE sale_id = ?`, [id]);

module.exports = { getAll, add, update, deleteProduct };
