const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    create: celebrate({
        [Segments.BODY]:Joi.object().keys({
            date: Joi.date().required(),
            time: Joi.string().required(),
            note: Joi.string(),
            user: Joi.string().required(),
        }),
    }),
    change: celebrate({
        [Segments.BODY]:Joi.object().keys({
            date: Joi.string(),
            time: Joi.string(),
            note: Joi.string(),
            user: Joi.string(),
        }),
    }),
};

