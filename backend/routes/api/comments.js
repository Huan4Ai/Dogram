const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { User, Post, Comment } = require('../../db/models');

const router = express.Router();

router.put('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {

  const commentToChange = await Comment.findByPk(req.params.id);
  await commentToChange.update(req.body);
  return res.json(commentToChange);


}));

router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const commentToDelete = await Comment.findByPk(req.params.id);

  if (commentToDelete) {
    await commentToDelete.destroy();
    return res.json(commentId);
  } else {
    throw new Error('Comment not found');
  };


}));




module.exports = router;
