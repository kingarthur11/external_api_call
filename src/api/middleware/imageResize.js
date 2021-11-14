const sharp = require('sharp');
const fs = require('fs')

const resizeImage = (workerData) => {
    return function(req, res, next) {
      sharp(workerData)
        .resize(200, 200)
        .toFile('./asset/uploads' + Date.now() + "--" + req.file.originalname);
        }
  }

  module.exports = {
    resizeImage
  };