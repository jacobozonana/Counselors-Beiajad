const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      date: Joi.date().required(),
      subject: Joi.string().required(),
      note: Joi.string(),
      author: Joi.string().required(),
      about: Joi.string().required(),
    }),
  }),
  change: celebrate({
    [Segments.BODY]: Joi.object().keys({
      date: Joi.string(),
      subject: Joi.string(),
      note: Joi.string(),
      author: Joi.string(),
      about: Joi.string(),
    }),
  }),
};
