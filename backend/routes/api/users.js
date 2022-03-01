const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Post, Follower } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post(
  "",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Post,
        },
      ],
    });

    return res.json(user);
  })
);

//search
router.put(
  "/search",
  asyncHandler(async (req, res) => {
    const { data } = req.body;

    const users = await User.findAll({
      where: {
        username: {
          [Op.iLike]: `%${data}%`,
        },
      },
    });

    return res.json(users);
  })
);

// Followers
router.get(
  "/:id/followers",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const followers = await User.findByPk(id, {
      include: ["followers"],
    });

    return res.json(followers);
  })
);

router.post(
  "/:id/followers",
  requireAuth,
  asyncHandler(async (req, res) => {
    const alreadyFollowing = await Follower.findOne({
      where: {
        followerId: req.user.id,
        followingId: req.params.id,
      },
    });
    if (!alreadyFollowing) {
      const follower = await Follower.create({
        followerId: req.user.id,
        followingId: req.params.id,
      });
      return res.json(follower);
    } else {
      return res.json(false);
    }
  })
);

// Following
router.get(
  "/:id/following",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const following = await User.findByPk(id, {
      include: ["following"],
    });
    return res.json(following);
  })
);

router.delete(
  "/:followerId/following/:followingId",
  asyncHandler(async function (req, res) {
    const { followingId, followerId } = req.params;

    const follow = await Follower.findOne({
      where: {
        followerId: followerId,
        //   followerId can be thought of as userId
        followingId: followingId,
      },
    });
    if (follow) {
      await follow.destroy();
      return res.json(true);
    } else {
      return res.json(false);
    }
  })
);

module.exports = router;
