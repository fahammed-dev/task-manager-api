const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const taskRoute = require('./routes/tasks.router');

require('dotenv').config();
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/v1/tasks', taskRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
