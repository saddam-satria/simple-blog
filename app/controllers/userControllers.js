const helpers = require('../helpers/users');
const { sequelize } = require('../models');

const addUsers = async (req, res) => {
  const { firstname, lastname, email, password, image } = req.body;
  try {
    const result = await helpers.userBuilder('', null, firstname, lastname, email, password, image);
    if (result.error) {
      throw result.msg;
    }
    const accessToken = helpers.generateTokenJWT('', result.user);
    res.status(200).json({ status: 'success', msg: 'success create new user', token: accessToken });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await helpers.queryAllUsers();
    if (result.error) {
      throw result.msg;
    }

    res.status(200).json({ status: 'success', msg: 'success get all users', users: result.users });
  } catch (error) {
    res.json({ status: 'error', msg: error }).status(401);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await helpers.deleteUser(id);
    if (result.error) {
      throw result.msg;
    }
    res.status(200).json({ status: 'success', msg: 'success delete user', deletedUser: result.user });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

const updateUser = async (req, res) => {
  const { firstname, lastname, email, password, image } = req.body;
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
    const result = await helpers.logout(id);
    if (result.error) {
      throw result.msg;
    }
    res.status(200).json({ status: 'success', msg: result.msg });
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
    res.status(200).json({ status: 'success', msg: 'login success', token: accessToken });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};
module.exports = { addUsers, getAllUsers, deleteUser, updateUser, logoutUser, loginUser };
