const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createComment = {
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};

const getComments = {
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId).required(),
  }),
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }),
};

module.exports = {
  createComment,
  getComments,
};
