const { CustomAPIError } = require('../utils/error');

const handleError = (err, _req, res, _next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: 'Something went wrong, please tey again' });
};

module.exports = handleError;
