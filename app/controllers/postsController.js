const { sequelize } = require('../models');
const { v4: uuidv4 } = require('uuid');

const addPost = async (req, res) => {
  const { title, desc, authorId } = req.body;
  const image = req.file.filename;

  try {
    const newPost = await sequelize.models.Posts.create({
      id: uuidv4(),
      title,
      image,
      desc,
      AuthorId: authorId,
    });
    res.status(201).json({ status: 'success', msg: 'success publish', newPost: newPost.title });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await sequelize.models.Posts.destroy({ where: { id } });
    if (deletedPost < 1) {
      throw 'Post not found';
    }
    res.status(200).json({ status: 'success', msg: 'success delete post', deletedPost });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const getPosts = async (req, res) => {
  const { limit } = req.params;
  let newToken;

  try {
    const posts = await sequelize.models.Posts.findAll({ limit });
    res.status(200).json({ status: 'success', msg: 'success get all posts', posts });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  try {
    const updatedPost = await sequelize.models.Posts.update(
      {
        title,
        desc,
      },
      {
        where: { id },
      }
    );
    if (updatedPost < 1) {
      throw 'Post not found';
    }
    res.status(200).json({ status: 'success', msg: 'success update post', updatedPost });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const detailPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await sequelize.models.Posts.findOne({ include: sequelize.models.Authors, where: { id } });
    if (post < 1) {
      throw 'Post not found';
    }

    res.status(200).json({ status: 'success', msg: 'success get author', postInfo: post });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

module.exports = { addPost, deletePost, getPosts, updatePost, detailPost };
