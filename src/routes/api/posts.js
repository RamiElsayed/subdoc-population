const { Router } = require('express');

const {
  getSinglePost,
  getPosts,
  createPost,
} = require('../../controllers/posts');

const router = Router();

router.get('/', getPosts)
router.get('/:postId', getSinglePost);
router.post('/', createPost);

module.exports = router;
