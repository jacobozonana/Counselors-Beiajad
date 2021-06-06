const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      quantity: Joi.number().required(),
      user: Joi.string().required(),
      product: Joi.string().required(),
    }),
  }),
};
