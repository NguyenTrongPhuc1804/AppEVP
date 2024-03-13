const errMiddleHandle = (err, _req, res, next) => {
  const statusCode = res.statusCode ?? 500;
  res.status(statusCode).json({
    mess: err.message,
    statusCode,
    stack: err.stack,
  });
};

module.exports = { errMiddleHandle };
