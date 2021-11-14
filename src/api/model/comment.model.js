const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentSchema = mongoose.Schema(
  {
    _id: Number,
    comment: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.plugin(AutoIncrement, {id: 'comment_id', inc_field: '_id'});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
