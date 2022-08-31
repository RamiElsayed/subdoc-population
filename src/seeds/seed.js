const mongoose = require('mongoose');

const { Post, Tags } = require('../models');

const { getRandomColor, getRandomPost, genRandomIndex } = require('./data');

// Start the seeding runtime timer
console.time('seeding');

const init = () => { 
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/postsTags", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[INFO]: Database connection successful");

    await Post.deleteMany({});
  await Tags.deleteMany({});
// Empty arrays for randomly generated posts and tags
const tags = [];
const posts = [];

// Function to make a post object and push it into the posts array
const makePost = (text) => {
  posts.push({
    published: Math.random() < 0.5,
    text,
    tags: [tags[genRandomIndex(tags)]._id],
  });
};

// Create 20 random tags and push them into the tags array
for (let i = 0; i < 20; i++) {
  const tagname = getRandomColor();

  tags.push({
    tagname,
    color: tagname,
  });
}

// Wait for the tags to be inserted into the database
await Tags.collection.insertMany(tags);

// For each of the tags that exist, make a random post of length 50
tags.forEach(() => makePost(getRandomPost(50)));

// Wait for the posts array to be inserted into the database
await Post.collection.insertMany(posts);

// Log out a pretty table for tags and posts, excluding the excessively long text property
console.table(tags);
console.table(posts, ['published', 'tags', '_id']);
console.timeEnd('seeding');
process.exit(0);
    console.log("[INFO]: Data seeded successfully");
    await mongoose.disconnect();
  } catch (error) {
    console.log(`[ERROR]: Failed to get all data | ${error.message}`);
  }
};

init()
// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the entries in the collection
  await Post.deleteMany({});
  await Tags.deleteMany({});

  // Empty arrays for randomly generated posts and tags
  const tags = [];
  const posts = [];

  // Function to make a post object and push it into the posts array
  const makePost = (text) => {
    posts.push({
      published: Math.random() < 0.5,
      text,
      tags: [tags[genRandomIndex(tags)]._id],
    });
  };

  // Create 20 random tags and push them into the tags array
  for (let i = 0; i < 20; i++) {
    const tagname = getRandomColor();

    tags.push({
      tagname,
      color: tagname,
    });
  }

  // Wait for the tags to be inserted into the database
  await Tags.collection.insertMany(tags);

  // For each of the tags that exist, make a random post of length 50
  tags.forEach(() => makePost(getRandomPost(50)));

  // Wait for the posts array to be inserted into the database
  await Post.collection.insertMany(posts);

  // Log out a pretty table for tags and posts, excluding the excessively long text property
  console.table(tags);
  console.table(posts, ['published', 'tags', '_id']);
  console.timeEnd('seeding');
  process.exit(0);
});
