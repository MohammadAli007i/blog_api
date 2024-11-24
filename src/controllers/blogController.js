const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const Blog = require("../models/Blog");

const createBlog = catchAsync(async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    author: req.user.id,
  });

  await blog.populate("author", "name");
  res.status(200).send(blog);
});

const getBlogs = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, tag, status } = req.query;
  const filter = {};

  if (tag) filter.tags = tag;
  if (status) filter.status = status;

  const blogs = await Blog.find(filter)
    .populate("author", "name")
    .populate({
      path: "comments",
      select: "content createdAt",
      populate: {
        path: "author",
        select: "name",
      },
    })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Blog.countDocuments(filter);

  res.send({
    blogs,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

const getBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findById(req.params.blogId)
    .populate("author", "name")
    .populate({
      path: "comments",
      select: "content createdAt",
      populate: {
        path: "author",
        select: "name",
      },
    });

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res.send(blog);
});

const updateBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const { user, body } = req;
  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (blog.author.toString() !== user.id && user.role !== "admin") {
    throw new ApiError(403, "Forbidden");
  }

  // Update the blog with the new data
  blog.set(body);
  await blog.save();

  res.send(blog);
});

const deleteBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findById(req.params.blogId);
  console.log(blog);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
    throw new ApiError(403, "Forbidden");
  }

  await Blog.findByIdAndDelete(req.params.blogId);
  res.status(204).send();
});

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
