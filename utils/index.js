const productModel = require('../models/productModel');
const productService = require('../services/productService');
const salesProductsModel = require('../models/salesProductsModel');

const serializeSale = (sale) => ({
  saleId: sale.sale_id,
  date: sale.date,
  productId: sale.product_id,
  quantity: sale.quantity,
});

const deleteItem = async (id) => {
  const [products] = await productModel.getAll();
  const sales = await salesProductsModel.getAll();

  const value = await Promise.all(sales.filter((sale) => sale.sale_id === +id)
    .map((item) => {
      const productFound = products.find((product) => product.id === item.product_id);

      const newValueProduct = { 
        name: productFound.name,
        quantity: productFound.quantity + item.quantity,
      };
    
      return productService.update(item.product_id, newValueProduct);
    }));
    
  return value;
};

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
  } else {
    result = await deleteItem(id);
  }

  return result;
}; 

module.exports = {
  serializeSale,
  actualizeProductsQuantity,
};
