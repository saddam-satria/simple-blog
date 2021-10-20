const { sequelize } = require('../models');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const queryAllUsers = async () => {
  try {
    const allUsers = await sequelize.models.Users.findAll();

    return { error: false, users: allUsers };
  } catch (error) {
    return { error: true, msg: error };
  }
};

const passwordValidation = async (action, password, passwordHash) => {
  if (action === 'check') {
    const checkPassword = await bcrypt.compare(password, passwordHash);
    if (checkPassword) {
      return { match: true, msg: 'correct password' };
    }
    return { match: false, msg: 'wrong password' };
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

const userBuilder = async (status, id, firstname, lastname, email, password, image) => {
  try {
    const hashedPassword = await passwordValidation('', password, null);
    if (status === 'update') {
      const updatedUser = await sequelize.models.Users.update(
        {
          firstName: firstname,
          lastName: lastname,
          email,
          password: hashedPassword,
          image,
        },
        {
          where: {
            id,
          },
        }
      );
      if (updatedUser[0] === 0) {
        throw 'User not found';
      }
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

const generateTokenJWT = (action, payload) => {
  const { REFRESH_TOKEN_SECRET_KEY, ACCESS_TOKEN_SECRET_KEY } = process.env;

  if (action === 'refresh') {
    const refreshToken = jwt.sign({ payload }, REFRESH_TOKEN_SECRET_KEY, { expiresIn: '3d' });
    return refreshToken;
  }

  const accessToken = jwt.sign({ payload }, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15s' });
  return { token: accessToken, type: 'access token' };
};

const logout = async (id) => {
  try {
    // Set token null, lastActive null
    const logoutUser = await sequelize.models.Users.update(
      {
        refreshToken: null,
      },
      {
        where: {
          id,
        },
      }
    );
    if (logoutUser[0] === 0) {
      throw 'User not Found';
    }
    return { error: false, msg: 'Successfully Logout' };
  } catch (error) {
    return { error: true, msg: error };
  }
};

module.exports = { queryAllUsers, passwordValidation, userBuilder, deleteUser, generateTokenJWT, logout };
