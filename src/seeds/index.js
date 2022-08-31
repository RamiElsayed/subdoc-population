const mongoose = require('mongoose');
const { faker } = require("@faker-js/faker")

const { Post, Tag } = require('../models');

const { getRandomColor, getRandomPost, genRandomIndex } = require('./data');

// Start the seeding runtime timer
console.time('seeding');

const init = async () => { 
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/postsTags", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[INFO]: Database connection successful");

  await Post.deleteMany({});
  await Tag.deleteMany({});
  

  const tagsArray = new Array(30).fill("");

  const tags = tagsArray.map(() => {
    return {
      tagName: faker.random.word(),
      color: faker.color.rgb({ prefix: "#"}),
      createdAt: faker.date.past(5),
    }
  });
    
  await Tag.insertMany(tags);
  console.log("[INFO]: Tags seeded successfully");

  const tagsFormDb = await Tag.find({});
  
  const postsArray = new Array(10).fill("");

  const posts = postsArray.map(() => {
    const randomNumberOfTags = Math.floor(Math.random() * 5);

    const tagsArray = new Array(randomNumberOfTags).fill("");

    const tags = tagsArray.map(() => {
      const randomTagIndex = Math.floor(Math.random() * tagsFormDb.length);
      const randomTagId = tagsFormDb[randomTagIndex].get("_id");

      return randomTagId;
    })
    return {
    published: Math.random() < 0.5,
    createdAt: faker.date.past(5),
    text: faker.lorem.sentence(10),
    tags,
  };
  });

    await Post.insertMany(posts)
    console.log("[INFO]: Posts seeded successfully");

    console.log("[INFO]: Data seeded successfully");
    await mongoose.disconnect();
  } catch (error) {
    console.log(`[ERROR]: Failed to get all data | ${error.message}`);
  }

  process.exit(0);
};

init()
