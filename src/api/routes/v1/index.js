const express = require('express');
const movieRoute = require('./movie.route');

const router = express.Router();

router.use('/product', movieRoute);

module.exports = router;
