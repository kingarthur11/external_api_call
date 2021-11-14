const express = require('express');
const movie = require('../../controller/movie.controller');

const router = express.Router();

router.get('/get-movie', movie.getMovie);
router.post('/post-comment/:id', movie.postComment);
router.get('/get-comments', movie.getComments);
router.get('/get-by-name', movie.sortCharByName);
router.get('/get-charater/:gender', movie.filterCharByGender);

module.exports = router;
