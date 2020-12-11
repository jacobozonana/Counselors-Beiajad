const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    create: celebrate({
        [Segments.BODY]:Joi.object().keys({
            image: Joi.string().required(),
            
        }),
    }),
    change: celebrate({
        [Segments.BODY]:Joi.object().keys({
            image: Joi.string(),
        }),
    }),
};
