const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();
const app = express();

app.use(morgan('dev'));
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
