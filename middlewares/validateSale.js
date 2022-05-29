const joi = require('joi');

const validateSale = (req, res, next) => {
  const schema = joi.object({
    productId: joi.number().required(),
    quantity: joi.number().required(),
  });
  
  const sales = req.body;

  for (let index = 0; index < sales.length; index += 1) {
    const { error } = schema.validate(sales[index], { abortEarly: false });
    if (error) {
      const messages = error.details.map((err) => err.message);
      return res.status(400).json({ message: messages[0] });
    }
  }
  
  next();
};

const validateLengthSale = (req, res, next) => {  
  const schema = joi.object({
    productId: joi.number().min(1),
    quantity: joi.number().min(1),
  });

  const sales = req.body;

  for (let index = 0; index < sales.length; index += 1) {
    const { error } = schema.validate(sales[index], { abortEarly: false });
    if (error) {
      const messages = error.details.map((err) => err.message);
      return res.status(422).json({ message: messages[0] });
    }
  }
  
  next();
};

module.exports = {
  validateSale,
  validateLengthSale,
};
