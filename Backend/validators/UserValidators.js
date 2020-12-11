const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    create: celebrate({
        [Segments.BODY]:Joi.object().keys({
            role: Joi.string(),
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            age: Joi.number(),
            comunity: Joi.string(),
            country: Joi.string().required(),
            tel: Joi.number().required(),
            specialty: Joi.string(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        }),
    }),
    change: celebrate({
        [Segments.BODY]:Joi.object().keys({
            role: Joi.string(),
            tel: Joi.number(),
            country: Joi.string(),
            email: Joi.string(),
            age: Joi.string(),
            specialty: Joi.string(),
            comunity: Joi.string(),
        }),
    }),
};