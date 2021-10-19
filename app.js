const express = require('express');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./app/router/Routes');
const PORT = process.env.PORT || 5000;
const path = require('path');
const sequelize = require('./app/models');

const app = express();

app.use(routes);
app.use(cors());
app.use(express.json());
app.use('/static', express.static('public'));
app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));
app.set('layouts', path.join(__dirname, 'app/views/layouts'));

const connectDB = async () => {
  try {
    await sequelize.sequelize.authenticate();
    console.log('Database Connected');
  } catch (error) {
    console.log(error);
  }
};

app.listen(PORT, async () => {
  await connectDB();
  console.log(`server running on ${PORT}`);
});
