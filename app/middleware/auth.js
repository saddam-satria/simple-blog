const helpers = require('../helpers/users');

const auth = (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if(token === undefined) {
      throw "Authorization header must fill"
    }
    token = token.split(' ')[1];
    if (!token) {
      throw 'Token Not Found';
    }
    const result = helpers.compareTokenJWT('', token);

    if (result.err !== null) {
      if (result.err.message.includes('invalid signature')) {
        throw 'Access Token Wrong';
      }

      if (result.err.message.includes('jwt expired')) {
        throw 'generate new access token soon';
      }
    }

    next();
  } catch (error) {
    res.status(401).json({ status: 'error', msg: error });
  }
};

module.exports = { auth };
