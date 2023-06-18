const mongoose = require('mongoose');

const dbConnect = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log('Database connection established'))
    .catch((error) => console.log(error));
};

module.exports = dbConnect;
