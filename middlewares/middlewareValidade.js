const returnArray = (object) => {
  if (object.name || object.quantity) return [object];
  return object;
};

const validateSchema = (schema) => (req, res, next) => {
  const itemsForVerification = returnArray(req.body);

  itemsForVerification.forEach((item) => {
    const { error } = schema.validate(item, { abortEarly: false });
    if (error) {
      const messages = error.details[0].message;
      const status = messages.includes('required') ? 400 : 422;
      return res.status(status).json({ message: messages });
    }
  });
  next();
};

module.exports = validateSchema;
