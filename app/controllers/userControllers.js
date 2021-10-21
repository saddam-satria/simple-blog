const helpers = require('../helpers/users');
const { sequelize } = require('../models');

const addUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const image = req.fileName;
  try {
    const result = await helpers.userBuilder('', null, firstname, lastname, email, password, image);
    if (result.error) {
      throw result.msg;
    }
    res.userid = result;
    const accessToken = helpers.generateTokenJWT('', result.user);
    res.status(200).json({ status: 'success', msg: 'success create new user', token: accessToken, user: result.user });
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
    res.status(200).json({ status: 'success', msg: 'success delete user', deletedUser: deletedUser });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const updateUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const image = req.fileName;
  const id = req.params.id;

  try {
    const result = await helpers.userBuilder('update', id, firstname, lastname, email, password, image);
    if (result.error) {
      throw result.msg;
    }
    res.status(200).json({ status: 'success', msg: 'success update user', updateUser: result.user });
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
        refreshToken: null,
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
    await sequelize.models.Users.update(
      {
        refreshToken,
        lastActive: Date.now(),
      },
      {
        where: { id: user.dataValues.id },
      }
    );

    res.status(200).json({ status: 'success', msg: 'login success', token: accessToken, user: user.id });
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
module.exports = { addUser, getAllUsers, deleteUser, updateUser, logoutUser, loginUser, detailUser };
