const { sequelize } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { promise } = require('bcrypt/promises');

const addAuthor = async (req, res) => {
  const { username, city, country, userId } = req.body;

  const birthday = new Date(2001, 09, 12);

  try {
    const newAuthor = await sequelize.models.Authors.create({
      id: uuidv4(),
      username,
      city,
      country,
      birthDay: birthday,
      UserId: userId,
    });
    res.status(200).json({ status: 'success', msg: 'success create new user', newAuthor: newAuthor.username });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const getAuthors = async (_req, res) => {
  try {
    const authors = await sequelize.models.Authors.findAll();
    res.status(200).json({ status: 'success', msg: 'success get all authors', authors });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteAuthor = await sequelize.models.Authors.destroy({
      where: {
        id,
      },
    });
    if (deleteAuthor < 1) {
      throw 'Author not found';
    }
    res.status(200).json({ status: 'success', msg: 'success delete author', deleteAuthor });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

module.exports = { addAuthor, getAuthors , deleteAuthor};
