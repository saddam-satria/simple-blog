const helpers = require('../helpers/users');

const addUsers = async (req, res) => {
  const { firstname, lastname, email, password, image } = req.body;

  try {
    const result = await helpers.userBuilder((status = ''), (id = null), firstname, lastname, email, password, image);
    if (result.error) {
      throw result.msg;
    }
    res.status(200).json({ status: 'success', msg: 'success create new user', newUser: result.user });
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
    const result = await helpers.userBuilder((status = 'update'), id, firstname, lastname, email, password, image);
    if (result.error) {
      throw result.msg;
    }
    res.status(200).json({ status: 'success', msg: 'success update user', updateUser: result.user });
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

module.exports = { addUsers, getAllUsers, deleteUser, updateUser };
