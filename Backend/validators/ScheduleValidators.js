const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      type: Joi.boolean().required(),
      date: Joi.date().required(),
      time: Joi.string().required(),
      note: Joi.string(),
      user: Joi.string().required(),
      doctor: Joi.string().required(),
      id: Joi.string(),
    }),
  }),
  change: celebrate({
    [Segments.BODY]: Joi.object().keys({
      type: Joi.boolean(),
      date: Joi.string(),
      time: Joi.string(),
      note: Joi.string(),
      user: Joi.string(),
      doctor: Joi.string(),
    }),
  }),
};
