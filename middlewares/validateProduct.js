const joi = require('joi');

const validateProduct = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    quantity: joi.number().required(),
  });
  
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ message: messages[0] });
  }
  next();
};
const validateLengthProduct = (req, res, next) => {  
  const schema = joi.object({
    name: joi.string().min(5),
    quantity: joi.number().min(1),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(422).json({ message: messages[0] });
  }
  next();
};

module.exports = {
  validateProduct,
  validateLengthProduct,
};
