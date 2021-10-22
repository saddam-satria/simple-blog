const express = require('express');
const cors = require('cors');
const routes = require('./app/router/Routes');
const sequelize = require('./app/models');
const { client } = require('./app/config/redis');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('public'));

app.use(routes);

const connectDB = async () => {
  try {
    await sequelize.sequelize.authenticate();
    // await sequelize.sequelize.sync({ force: true });
    console.log('Database Connected');
  } catch (error) {
    console.log(error);
  }
};

app.listen(PORT, async () => {
  try {
    await connectDB();

    client.on('error', () => {
      console.log('Redis Not Connected');
    });
    client.on('connect', () => {
      console.log('redis connected');
    });
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on ${PORT}`);
});
