const { sequelize } = require('../models');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');

require('dotenv').config();

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
    if (status === 'update') {
      const newPassword = await passwordValidation('', password, null);
      const updatedUser = await sequelize.models.Users.update(
        {
          firstName: firstname,
          lastName: lastname,
          email,
          password: newPassword,
          image,
          updatedAt: Date.now(),
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
    });
    return { error: false, user: newUser.id };
  } catch (error) {
    return { msg: error, error: true };
  }
};

const generateTokenJWT = (action, payload) => {
  const { REFRESH_TOKEN_SECRET_KEY, ACCESS_TOKEN_SECRET_KEY } = process.env;

  if (action === 'refresh') {
    const refreshToken = jwt.sign({ payload }, REFRESH_TOKEN_SECRET_KEY, { expiresIn: '7d' });
    return { token: refreshToken, type: 'refresh token' };
  }

  const accessToken = jwt.sign({ payload }, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15m' });
  return { token: accessToken, type: 'access token' };
};

const compareTokenJWT = (action, token) => {
  if (action === 'refresh') {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY, (err, user) => {
      return { err, user };
    });
  }
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    return { err, user };
  });
};

const uploadUserImageOption = () => {
  const storage = multer.diskStorage({
    //multers disk storage settings
    destination: function (_req, _file, cb) {
      cb(null, './public/img/uploads/users/');
    },
    filename: (req, file, cb) => {
      const uniqueFileName = Date.now() + '-' + req.params.id;
      const fileName = uniqueFileName + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
      cb(null, fileName);
    },
  });

  const filterFile = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(JSON.stringify({ msg: 'File must be image', error: true }), false);
      return cb(new Error({ msg: 'File must be image ' }));
    }
  };

  return { storage, filterFile };
};

const uploadPostImageOption = () => {
  const storage = multer.diskStorage({
    //multers disk storage settings
    destination: function (_req, _file, cb) {
      cb(null, './public/img/uploads/blogs/');
    },
    filename: (req, file, cb) => {
      const uniqueFileName = Date.now();
      const fileName = file.fieldname + '-' + uniqueFileName + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
      cb(null, fileName);
    },
  });

  const filterFile = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(JSON.stringify({ msg: 'File must be image', error: true }), false);
      return cb(new Error({ msg: 'File must be image ' }));
    }
  };

  return { storage, filterFile };
};

module.exports = { passwordValidation, userBuilder, generateTokenJWT,compareTokenJWT, uploadUserImageOption, uploadPostImageOption };
