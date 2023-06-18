const express = require('express');
const dbConnect = require('./db/dbConnect');
const morgan = require('morgan');
const cors = require('cors');
const taskRoute = require('./routes/tasks.router');
const notFound = require('./middleware/notFound.middleware');

require('dotenv').config();
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/v1/tasks', taskRoute);

app.use(notFound);

const startServer = async () => {
  try {
    dbConnect(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
