const middlewareError = (err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message || 'Erro interno' });
};

module.exports = middlewareError;
