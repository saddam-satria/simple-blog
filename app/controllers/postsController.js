const { sequelize } = require('../models');

const addPost = async (req, res) => {
  const { title, image, desc, authorId } = req.body;

  try {
    const newPost = await sequelize.Posts.create({
      title,
      image,
      desc,
      AuthorId: authorId,
    });

    res.status(200).json({ status: 'success', msg: 'success publish', newPost: newPost.title });
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
    res.status(200).json({ status: 'success', msg: 'success delete post', deletedAuthor });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const getPosts = async (req, res) => {
  const { limit } = req.params;

  try {
    const posts = await sequelize.models.Posts.findAll({ limit });
    res.status(200).json({ status: 'success', msg: 'success get all posts', posts });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, desc, image } = req.body;

  try {
    const updatedPost = await sequelize.models.Posts.update(
      {
        title,
        desc,
        image
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

module.exports = { addPost, deletePost, getPosts,updatePost };
