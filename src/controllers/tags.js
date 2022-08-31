const { Tag } = require('../models');


 const getTags = async (req, res) => {
    try {
      const tags = await Tag.find({});
      return res.json({ data: tags});
    } catch (error) {
      console.log(`[ERROR]: Failed to get all tags | ${error.message}`);
      return res.status(500).json({ success: false })
    }
  };
  const getSingleTag = async (req, res) => {
    try {
      const { tagId } = req.params;

      const tag = await Tag.findById({tagId});
      
      if (!tag) {
        res.status(404).json({ success: false})
      }
      return res.json({ success: true, data: tags});
    } catch (error) {
      console.log(`[ERROR]: Failed to get single tag | ${error.message}`);
      return res.status(500).json({ success: false });
    }
  };
  // create a new tag
  const createTag = async (req, res) => {
    try {
      const { payload } = req.body;

      const tag = await Tag.create(payload);
      
      return res.json({ success: true, data: tag });
    } catch (error) {
      console.log(`[ERROR]: Failed to create tag | ${error.message}`);
      return res.status(500).json({ success: false });
    }
   
  }

  module.exports =  {
    getTags,
    getSingleTag,
    createTag
  }