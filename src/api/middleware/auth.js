const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../../config/vars');

const verifyToken = {
  verify(req, res, next) {
    if (req.headers.authorization === undefined) {
      throw new Error('Token not found');
    }
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Failed to authenticate token.');
      }
      req.id = decoded.id;
      req.username = decoded.username;
      return next();
    });
  },
};

module.exports = {
  verifyToken
};