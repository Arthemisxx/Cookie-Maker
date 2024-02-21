function generateError(res, description) {
  res.render('error', {
    description,
  });
}

module.exports = {
  generateError,
};
