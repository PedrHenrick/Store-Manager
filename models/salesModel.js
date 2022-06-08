const connection = require('../database/connection');

const getAll = () => connection.execute(`
SELECT DISTINCT sp.sale_id as saleId, 
  sp.product_id as productId, 
  sp.quantity, s.date
FROM sales_products as sp
INNER JOIN sales s
ON s.id = sp.sale_id
ORDER BY sp.sale_id ASC, sp.product_id ASC;`);

const getAllSale = () => connection.execute('SELECT * FROM sales;');

const getAllSaleById = (id) => connection.execute('SELECT * FROM sales WHERE id = ?;', [id]);

const getById = (id) => connection.execute(`SELECT s.date, 
  sp.product_id as productId,
  sp.quantity
FROM sales_products as sp
INNER JOIN sales s
ON s.id = sp.sale_id
WHERE sp.sale_id = ?
ORDER BY sp.sale_id ASC, sp.product_id ASC;`, [id]);

const add = async () => {
  const [rows] = await connection.execute('INSERT INTO sales (date) VALUES (NOW());');
  return { id: rows.insertId };
};

const deleteProduct = async (id) => connection.execute('DELETE FROM sales WHERE id = ?;', [id]);

module.exports = { getAll, getAllSale, getAllSaleById, getById, add, deleteProduct };
