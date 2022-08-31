const { Router } = require('express');

const {
  getTags,
  getSingleTag,
  createTag,
} = require('../../controllers/tags');

const router = Router();

router.get('/', getTags)
router.get('/:tagId', getSingleTag);
router.post('/', createTag);

module.exports = router;
