const joi = require('joi');

const schemaProduct = joi.object({
  name: joi.string().min(5).required(),
  quantity: joi.number().min(1).required(),
});

const schemaSale = joi.object({
  productId: joi.number().min(1).required(),
  quantity: joi.number().min(1).required(),
});

module.exports = { schemaProduct, schemaSale };