const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { User, Post, Comment, Like } = require('../../db/models');
// import { singlePublicFileUpload } from '../../awsS3';
// import { singleMulterUpload } from '../../awsS3';
// const singlePublicFileUpload = require("../../awsS3");
// const singleMulterUpload = require("../../awsS3");
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');


const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const allPosts = await Post.findAll({
    include: [
      {
        model: User,
      }, {
        model: Comment,
      },
      {
        model: Like
      }
    ]
  }, );
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

router.post('/:id(\\d+)/comments', requireAuth, asyncHandler(async (req, res, next) => {
  const { content } = req.body;

  const newComment = await Comment.create({
    user_id: req.user.id,
    post_id: req.params.id,
    content
  });

  res.json(newComment);

}));

// Like routes

router.get('/:id(\\d+)/likes', asyncHandler(async (req, res) => {
  const allLikes = await Like.findAll({
    where: { post_id: req.params.id }
  });

  return res.json(allLikes);


}));

router.post('/:id(\\d+)/likes', requireAuth, asyncHandler(async (req, res) => {
  const alreadyLiked = await Like.findOne({
    where: {
      user_id: req.user.id,
      post_id: req.params.id
    },
  });

  if (!alreadyLiked) {
    const newLike = await Like.create({
      user_id: req.user.id,
      post_id: req.params.id
    });

    return res.json(newLike);

  };

}));

router.delete('/:id(\\d+)/likes/:userId(\\d+)', asyncHandler(async (req, res) => {
  const { id, userId } = req.params;

  const likeToDelete = await Like.findOne({
    where: {
      user_id: userId,
      post_id: id
    },
  });

  if (likeToDelete) {
    await likeToDelete.destroy();
    return res.json(true);
  } else {
    return res.json(false);
  };


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
