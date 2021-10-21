const testing = (req, res, next) => {
  console.log(req.body);
  console.log(res.userid);
};

module.exports = testing;
