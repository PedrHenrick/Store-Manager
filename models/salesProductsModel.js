const connection = require('../database/connection');

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

module.exports = {
  add,
  update,
};