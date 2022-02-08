const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Post } = require("../../db/models");
const { Op } = require("sequelize");


const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Post
        }
      ],
    });

    return res.json(user);
  })
);

//search
router.put("/search", requireAuth, asyncHandler(async (req, res) => {
  const { result } = req.body;

  const users = await User.findAll({
    where: {
      username: {
        [Op.iLike]: `%${result}%`,
      },
    },

  });

  res.json(users);


})

);

module.exports = router;
