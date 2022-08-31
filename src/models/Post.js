const { Schema, model } = require('mongoose');

const postSchema = {
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tag',
    },
  ],
  text: {
    type: String,
    minLength: 15,
    maxLength: 500,
  },
};
const schema =  new Schema(postSchema,{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

schema.virtual('tagCount').get(function () {
    return this.tags.length;
  });

const Post = model('post', schema);

module.exports = Post;
