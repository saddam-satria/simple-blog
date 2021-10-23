const { sequelize } = require('../models');

const getAllPosts = async (limit, page) => {
  if (page > 0) {
    return await sequelize.models.Posts.findAll({ limit, offset: page });
  }
  return await sequelize.models.Posts.findAll({ limit });
};

const getAllAuthors = async (limit, page) => {
  if (page > 0) {
    return await sequelize.models.Authors.findAll({ limit, offset: page });
  }
  return await sequelize.models.Authors.findAll({ limit });
};
module.exports = { getAllPosts, getAllAuthors };
