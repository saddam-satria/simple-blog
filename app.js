const express = require('express');
const cors = require('cors');
const routes = require('./app/router/Routes');
const sequelize = require('./app/models');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
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
  await connectDB();
  console.log(`server running on ${PORT}`);
});
