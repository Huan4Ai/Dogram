const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { User, Post } = require('../../db/models');
// import { singlePublicFileUpload } from '../../awsS3';
// import { singleMulterUpload } from '../../awsS3';
// const singlePublicFileUpload = require("../../awsS3");
// const singleMulterUpload = require("../../awsS3");
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');


const router = express.Router();

router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const allPosts = await Post.findAll();
  return res.json(allPosts);
}));

router.post("/", singleMulterUpload("image"), requireAuth, asyncHandler(async (req, res) => {
  const { description } = req.body;

  const photo_url = await singlePublicFileUpload(req.file);
  let newPost = await Post.create({
    user_id: req.user.id,
    description,
    photo_url
  });

  res.json(newPost);

}));




module.exports = router;
