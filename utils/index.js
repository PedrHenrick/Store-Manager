const productModel = require('../models/productModel');

const objectErrorByQuantity = { status: 422, message: 'Such amount is not permitted to sell' }; 
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
  const [sales] = await salesProductsModel.getAll();

  const value = await sales.filter((sale) => sale.sale_id === +id)
    .map((item) => {
      const productFound = products.find((product) => product.id === item.product_id);

      const newValueProduct = { 
        name: productFound.name,
        quantity: productFound.quantity + item.quantity,
      };
      return productService.update({ id: item.product_id }, newValueProduct);
    });
  return value;
};

const updateItem = async (id, saleUpdate) => {
  const [products] = await productModel.getAll();
  const [sales] = await salesProductsModel.getAll();

  const values = await saleUpdate.map((sale) => {
    const productFound = products.find((product) => product.id === sale.productId);
    const value = sales.filter((item) => item.sale_id === +id)
      .filter((resultSale) => resultSale.product_id === sale.productId)[0];

    const newValueProduct = { 
      name: productFound.name,
      quantity: productFound.quantity + (value.quantity - sale.quantity),
    };

    if (newValueProduct.quantity < 0) throw objectErrorByQuantity;
    return productService.update({ id: value.product_id }, newValueProduct);
  });
  return values;
};

const addItem = async (sales) => {
  const [products] = await productModel.getAll();
  
  const value = await sales.map((sale) => {
    const productFound = products.find((product) => product.id === sale.productId);
    
    if (!productFound || (productFound.quantity - sale.quantity) < 0) throw objectErrorByQuantity;
    
    const newValueProduct = { 
      name: productFound.name,
      quantity: productFound.quantity - sale.quantity,
    };
    return productService.update({ id: sale.productId }, newValueProduct);
  });
  return value;
};

module.exports = {
  serializeSale,
  addItem,
  updateItem,
  deleteItem,
};
