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

router.patch('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {

  const postToUpdate = await Post.findByPk(req.params.id);
  const { description } = req.body;

  if (postToUpdate && (req.user.id === postToUpdate.user_id)) {
    postToUpdate.update({
      description
    });
    res.json(postToUpdate);
    res.redirect('/');
  } else if (req.user.id !== postToUpdate.user_id) {
    next(new Error("You are not authorized to update that"));
  } else {
    next(new Error("Question not found"));
  }

}));

  // const photo_url = await singlePublicFileUpload(req.file);

  // if (req.file) {
  //   await postToUpdate.update({
  //     description,
  //     photo_url
  //   });
  // } else {
  //   await postToUpdate.update({
  //     description,
  //     photo_url: image || null
  //   })
  // }


module.exports = router;
