const Comment = require('../model/comment.model');

const addComment = async (commentBody) => {
  console.log(commentBody)
  const comment = await Comment.create(commentBody);
  return comment;
};

async function getAllComments() {
  const comment = await Comment.find();
  return comment;
}

module.exports = {
  addComment,
  getAllComments
};

