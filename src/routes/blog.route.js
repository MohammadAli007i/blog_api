const express = require("express");
const validate = require("../middleware/validate");
const blogValidation = require("../validators/blog.validator");
const blogController = require("../controllers/blogController");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .post(auth, validate(blogValidation.createBlog), blogController.createBlog)
  .get(validate(blogValidation.getBlogs), blogController.getBlogs);

router
  .route("/:blogId")
  .get(validate(blogValidation.getBlog), blogController.getBlog)
  .patch(auth, validate(blogValidation.updateBlog), blogController.updateBlog)
  .delete(auth, blogController.deleteBlog);

module.exports = router;
