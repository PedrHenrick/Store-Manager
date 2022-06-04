const connection = require('../database/connection');

const getAll = async () => {
  const query = 'SELECT * FROM sales_products';
  const [sales] = await connection.execute(query);
  return sales;
};

const add = async (id, { productId, quantity }) => {
  const query = 'INSERT INTO sales_products(sale_id, product_id, quantity) VALUES(?, ?, ?);';
  await connection.execute(query, [id, productId, quantity]);
  
  return {
    productId,
    quantity,
  };
};

const update = async (id, { productId, quantity }) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;';
  await connection.execute(query, [quantity, id, productId]);
  
  return {
    productId,
    quantity,
  };
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM sales_products WHERE sale_id = ?;';
  return connection.execute(query, [id]);
};

module.exports = {
  getAll,
  add,
  update,
  deleteProduct,
};