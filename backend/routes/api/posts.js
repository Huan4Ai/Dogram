const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { User, Post, Comment } = require('../../db/models');
// import { singlePublicFileUpload } from '../../awsS3';
// import { singleMulterUpload } from '../../awsS3';
// const singlePublicFileUpload = require("../../awsS3");
// const singleMulterUpload = require("../../awsS3");
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');


const router = express.Router();

router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const allPosts = await Post.findAll({
    include: [
      {
        model: User,
      }, {
        model: Comment,
      },
    ],
  });
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
    // res.redirect('/');
  } else if (req.user.id !== postToUpdate.user_id) {
    new Error("You are not authorized to update that");
  } else {
    new Error("Question not found");
  }

}));

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {

  const postToDelete = await Post.findByPk(req.params.id);

  await postToDelete.destroy();

  return res.json(postToDelete);


}));

router.get('/:id(\\d+)/comments', asyncHandler(async (req, res, next) => {
  const allComments = await Comment.findAll({
    where: { post_id: req.params.id },
    include: [
      {
        model: User
      }
    ]
  });

  return res.json(allComments);

}));

router.post('/:id(\\d+)/comments', asyncHandler(async (req, res, next) => {
  const { comment } = req.body;

  const newComment = await Comment.create({
    user_id: req.user.id,
    post_id: req.params.id,
    comment
  });

  res.json(newComment);

}))

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
