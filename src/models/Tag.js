const { Schema, model } = require("mongoose");

const tagSchema = {
  tagName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#008080",
  },
  createdAt: {
    type: Date,
  },
};

const schema = new Schema(tagSchema, {
  toJSON: {
    virtuals: true,
  },
});

schema.virtual("getTagCss").get(function () {
    return `color: ${this.color}`;
  });

const Tag = model("tag", schema);

module.exports = Tag;
