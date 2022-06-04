const productModel = require('../models/productModel');
const productService = require('../services/productService');
const salesProductsModel = require('../models/salesProductsModel');

const serializeSale = (sale) => ({
  saleId: sale.sale_id,
  date: sale.date,
  productId: sale.product_id,
  quantity: sale.quantity,
});

const addItem = async (sales) => {
  const [products] = await productModel.getAll();

  const value = await Promise.all(sales.map((sale) => {
    const productFound = products.find((product) => product.id === sale.productId);

    if (!productFound || (productFound.quantity - sale.quantity) < 0) {
      const object = { status: 422, message: 'Such amount is not permitted to sell' }; 
      throw object;
    }

    const newValueProduct = { 
      name: productFound.name,
      quantity: productFound.quantity - sale.quantity,
    };

    return productService.update(sale.productId, newValueProduct);
  }));

  return value;
};

const actualizeProductsQuantity = async (id, sales) => {
  let result;
  
  if (!id && sales) {
    result = await addItem(sales);
  }

  return result;
}; 

module.exports = {
  serializeSale,
  actualizeProductsQuantity,
};
