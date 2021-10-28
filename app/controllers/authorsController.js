const { sequelize } = require('../models');
const { v4: uuidv4 } = require('uuid');
const query = require('../helpers/query');

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
    res.status(201).json({ status: 'success', msg: 'success create new user', newAuthor: newAuthor.username, authorId: newAuthor.id });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const getAuthors = async (req, res) => {
  const { limit, page } = req.query;
  try {
    const authors = await query.getAllAuthors(limit, page);
    res.status(200).json({ status: 'success', msg: 'success get all authors', authors });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAuthor = await sequelize.models.Authors.destroy({
      where: {
        id,
      },
    });
    if (deleteAuthor < 1) {
      throw 'Author not found';
    }
    res.status(200).json({ status: 'success', msg: 'success delete author', deletedAuthor });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const updateAuthors = async (req, res) => {
  const { username, city, country, birthday } = req.body;
  const { id } = req.params;

  try {
    const updatedAuthor = await sequelize.models.Authors.update(
      {
        username,
        city,
        country,
        birthDay: birthday,
      },
      {
        where: {
          id,
        },
      }
    );
    if (deleteAuthor < 1) {
      throw 'Author not found';
    }
    res.status(200).json({ status: 'success', msg: 'success update author', updatedAuthor });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const getDetailAuthor = async (req, res) => {
  const { id } = req.params;

  try {
    const author = await sequelize.models.Authors.findOne({ include: sequelize.models.Users, where: { UserId: id } });
    if (author < 1) {
      throw 'Author not found';
    }
    res.status(200).json({ status: 'success', msg: 'success get author', authorInfo: author });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

module.exports = { addAuthor, getAuthors, deleteAuthor, updateAuthors, getDetailAuthor };
