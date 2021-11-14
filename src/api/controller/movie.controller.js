const axios = require('axios'); 
const httpStatus = require("http-status")
const catchAsync = require('../utils/catchAsync');
const ApiError = require("../utils/ApiError")
const {addComment, getAllComments} = require('../services/comment.service')

  const getMovie = catchAsync((req, res) => {
      axios.get('https://swapi.dev/api/films')
      .then(function(response) {
          const data = response.data.results
          const result = data.map((item) => {
            return (
              {title: item.title,
              crawl: item.opening_crawl,
              released_data: item.release_date,
            }
            )
          })
          result.sort((a, b) => {
            a.released_data - b.release_date
          })
          res.json(result);
    })
  });

  const postComment = catchAsync((req, res) => {
    axios.get('https://swapi.dev/api/films')
      .then(function(response) {
        const {id} = req.params;
        const comment = req.body;
        const data = response.data.results
        const input = data.filter((item) => {
          return item.episode_id == id
        })
        input[0].comment = comment;
        addComment(comment)
      res.json(input);
    });
    
  });

  const getComments = catchAsync(async (req, res) => {
      const comment = await getAllComments();
      return res.send(comment);
  });

  const sortCharByName = catchAsync((req, res) => {
    axios.get('https://swapi.dev/api/people')
      .then(function(response) {
          const data = response.data.results
          data.sort((a, b) => 
          a.name !== b.name ? 
          a.name < b.name ? 
          -1 : 1 : 0);
         
          res.json(data);
    });
  });

  const filterCharByGender = catchAsync((req, res) => {
    axios.get('https://swapi.dev/api/people')
      .then(function(response) {

        const {gender} = req.params;
        const data = response.data.results
        const input = data.filter((item) => item.gender === gender)

        let counter = 0;
        for (let i = 0; i < input.length; i++) {
          if (input[i].name) counter++;
        }

        let sumHeight = input.reduce((accumulator, item) => {
          return accumulator + Number(item.height)
        }, 0);
       
      res.json({counter, sumHeight, input});
    });
  });

  module.exports = {
    getMovie,
    postComment,
    getComments,
    sortCharByName,
    filterCharByGender
  };