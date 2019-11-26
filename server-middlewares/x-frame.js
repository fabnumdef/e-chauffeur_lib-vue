module.exports = function xFrameOptions(req, res, next) {
  res.setHeader('X-Frame-Options', 'deny');
  return next();
};
