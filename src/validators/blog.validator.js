const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createBlog = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    status: Joi.string().valid("draft", "published").default("published"),
    author: Joi.string().required(),
  }),
};

const updateBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      content: Joi.string(),
      tags: Joi.array().items(Joi.string()),
      status: Joi.string().valid("draft", "published"),
    })
    .min(1),
};

const getBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId),
  }),
};

const getBlogs = {
  query: Joi.object().keys({
    title: Joi.string(),
    tag: Joi.string(),
    author: Joi.string().custom(objectId),
    status: Joi.string(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string(),
  }),
};

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getBlogs,
};
