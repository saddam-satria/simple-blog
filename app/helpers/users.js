const { sequelize } = require('../models');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const queryAllUsers = async () => {
  try {
    const allUsers = await sequelize.models.Users.findAll();

    return { error: false, users: allUsers };
  } catch (error) {
    return { error: true, msg: error };
  }
};

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

const userBuilder = async (status, id, firstname, lastname, email, password, image) => {
  try {
    if (status === 'update') {
      const updatedUser = await sequelize.models.Users.update(
        {
          firstName: firstname,
          lastName: lastname,
          email,
          password,
          image,
        },
        {
          where: {
            id,
          },
        }
      );
      return { error: false, updateUser: updatedUser };
    }

    const newUser = await sequelize.models.Users.create({
      id: uuidv4(),
      firstName: firstname,
      lastName: lastname,
      email,
      password,
      image,
    });
    return { error: false, user: newUser.id };
  } catch (error) {
    return { msg: error, error: true };
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await sequelize.models.Users.destroy({
      where: {
        id,
      },
    });
    return { error: false, user: deletedUser };
  } catch (error) {
    return { error: true, msg: error };
  }
};

module.exports = { queryAllUsers, hashPassword, userBuilder, deleteUser };
