const express = require("express");
const validate = require("../middleware/validate");
const commentValidation = require("../validators/comment.validator");
const commentController = require("../controllers/commentController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router
  .route("/:blogId/comments")
  .post(
    auth,
    validate(commentValidation.createComment),
    commentController.createComment
  )
  .get(validate(commentValidation.getComments), commentController.getComments);

module.exports = router;
