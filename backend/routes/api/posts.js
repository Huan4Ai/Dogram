const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { User, Post } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const allPosts = await Post.findAll();
  return res.json(allPosts);
}));






module.exports = router;
