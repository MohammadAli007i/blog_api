const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

const createComment = catchAsync(async (req, res) => {
  const blog = await Blog.findById(req.params.blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const comment = await Comment.create({
    content: req.body.content,
    blog: req.params.blogId,
    author: req.user.id,
  });

  await comment.populate("author", "name");
  res.status(200).send(comment);
});

const getComments = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const blog = await Blog.findById(req.params.blogId);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const comments = await Comment.find({ blog: req.params.blogId })
    .populate("author", "name")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Comment.countDocuments({ blog: req.params.blogId });

  res.send({
    comments,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

module.exports = {
  createComment,
  getComments,
};
