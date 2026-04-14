function getAddonsFromReq(req) {
  const { addons } = req.cookies;

  return addons ? JSON.parse(addons) : [];
}

module.exports = {
  getAddonsFromReq,
};
