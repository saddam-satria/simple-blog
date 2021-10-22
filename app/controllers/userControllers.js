const helpers = require('../helpers/users');
const { sequelize } = require('../models');
const { client } = require('../config/redis');

const addUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const result = await helpers.userBuilder('', null, firstname, lastname, email, password, '');
    if (result.error) {
      throw result.msg;
    }
    res.userid = result;
    const accessToken = helpers.generateTokenJWT('', result.user);
    const refreshToken = helpers.generateTokenJWT('refresh', result.user);
    client.setex(result.user, 604800, refreshToken.token, (err, reply) => {
      if (err) {
        throw 'Failed cache';
      }
      console.log('cache ' + result.user + reply);
    });
    res.status(201).json({ status: 'success', msg: 'success create new user', accessToken, refreshToken });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await sequelize.models.Users.findAll();

    res.status(200).json({ status: 'success', msg: 'success get all users', users: allUsers });
  } catch (error) {
    res.json({ status: 'error', msg: error }).status(401);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await sequelize.models.Users.destroy({
      where: {
        id,
      },
    });
    if (deletedUser < 1) {
      throw 'User not found';
    }
    res.status(201).json({ status: 'success', msg: 'success delete user', deletedUser: deletedUser });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const updateUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const id = req.params.id;
  const image = req.file.filename;
  try {
    const result = await helpers.userBuilder('update', id, firstname, lastname, email, password, image);
    if (result.error) {
      throw result.msg;
    }
    res.status(201).json({ status: 'success', msg: 'success update user', updateUser: result.user });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const logoutUser = async (req, res) => {
  const id = req.params.id;
  try {
    // Set token null, lastActive null
    const logoutUser = await sequelize.models.Users.update(
      {
        lastActive: Date.now(),
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
    res.status(200).json({ status: 'success', msg: 'Successfully Logout' });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // const token = helpers.generateTokenJWT('')
  try {
    const user = await sequelize.models.Users.findOne({ where: { email } });
    if (user === null) {
      throw "Email does'nt exist";
    }
    // check password
    const checkPassword = await helpers.passwordValidation('check', password, user.dataValues.password);
    if (!checkPassword.match) {
      throw checkPassword.msg;
    }
    const accessToken = helpers.generateTokenJWT('', user.dataValues.id);
    const refreshToken = helpers.generateTokenJWT('refresh', user.dataValues.id);
    client.setex(user.dataValues.id, 604800, refreshToken.token, (err, reply) => {
      if (err) {
        throw 'Failed cache';
      }
      console.log('cache ' + user.dataValues.id + reply);
    });
    res.status(200).json({ status: 'success', msg: 'login success', accessToken: accessToken, refreshToken });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const detailUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await sequelize.models.Users.findOne({ include: sequelize.models.Authors, where: { id } });
    if (user === null) {
      throw 'User not found';
    }
    res.status(200).json({ status: 'success', msg: 'success get user info', userInfo: user });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const revokeAccessToken = (req, res) => {
  const refreshToken = req.header('Authorization').split(' ')[1];

  try {
    const result = helpers.compareTokenJWT('refresh', refreshToken);
    if (result.err !== null) {
      if (result.err.message.includes('invalid signature') || result.err.message.includes('jwt expired')) {
        throw 'token error';
      }
    }

    client.get(result.user.payload, (err, reply) => {
      if (reply === null) {
        throw 'user not found in cache';
      }

      if (reply === refreshToken) {
        const newAccessToken = helpers.generateTokenJWT('', result.user.payload);
        res.status(201).json({ status: 'success', newAccessToken });
      } else {
        res.status(403).json({ status: 'error', msg: 'Token is wrong' });
      }
    });
  } catch (error) {
    res.status(403).json({ status: 'error', msg: error });
  }
};

module.exports = { addUser, getAllUsers, deleteUser, updateUser, logoutUser, loginUser, detailUser, revokeAccessToken };
