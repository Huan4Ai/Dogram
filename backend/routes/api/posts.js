const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { User, Post } = require('../../db/models');
import { singlePublicFileUpload } from '../../awsS3';
import { singleMulterUpload } from '../../awsS3';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const allPosts = await Post.findAll();
  return res.json(allPosts);
}));

router.post("/", singleMulterUpload("image"), asyncHandler(async (req, res) => {
  const { description } = req.body;
  const photo_url = await singlePublicFileUpload(req.file);
  const newPost = await Post.create({
    user_id: req.user.id,
    description,
    photo_url
  });
  res.json(newPost);

}));




module.exports = router;
