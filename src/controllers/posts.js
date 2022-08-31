const { Post } = require('../models');

const getPosts = async(req, res) => {
  try {
    const posts = await Post.find({}).populate("tags");
    
    return res.json({ data: posts});
  } catch (error) {
    console.log(`[ERROR]: Failed to get all Posts | ${error.message}`);
    return res.status(500).json({ success: false })
  }
}
const getSinglePost = async(req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate("tags");
    if (!post) {
      res.status(404).json({ success: false})
    }
    
    return res.json({ data: post});
  } catch (error) {
    console.log(`[ERROR]: Failed to get single Post | ${error.message}`);
    return res.status(500).json({ success: false })
  }
}
const createPost = async(req, res) => {
  try {
    const { payload } = req.body;

    const post = await Post.create(payload);
    
    return res.json({ success: true, data: post });
  } catch (error) {
    console.log(`[ERROR]: Failed to create post | ${error.message}`);
    return res.status(500).json({ success: false });
  }
 
}
module.exports = {
  getPosts,
  getSinglePost,
  createPost,
};
