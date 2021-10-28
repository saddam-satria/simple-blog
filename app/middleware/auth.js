const helpers = require('../helpers/users');

const auth = (req, res, next) => {
  let token = req.header('Authorization');
  try {
    if (token === undefined) {
      throw 'Authorization header must fill';
    }
    token = token.split(' ')[1];
    if (token === null) {
      throw 'Token not found';
    }

    const result = helpers.compareTokenJWT('', token);

    if (result.err !== null) {
      if (result.err.message.includes('invalid signature')) {
        throw 'Access Token Wrong';
      }

      if (result.err.message.includes('jwt expired')) {
        throw 'generate new access token soon';
      }

      if (result.err.message.includes('jwt must be provided')) {
        throw 'Token is empty';
      }
    }

    next();
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

module.exports = { auth };
