const homepage = (req, res) => {
  res.render('homepage', {
    title: 'Homepage',
  });
};

module.exports = { homepage };
