const Joi = require('@hapi/joi')

const update = Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().optional(),
    password: Joi.string()
        .min(6)
        .max(50)
        .optional(),
    username: Joi.string().optional(),
    phone: Joi.string().optional(),
    role_id: Joi.string().optional(),
    birthday: Joi.string().optional(),
    isVerified: Joi.number().optional(),
    isBlocked: Joi.number().optional(),
    custom_config: Joi.string().optional(),
    del_flag: Joi.number().optional()
})

module.exports = {
    update: {
        params: Joi.object().keys({
            user_id: Joi.string().required()
        }),
        body: update
    },
    get: {
        params: Joi.object().keys({
            user_id: Joi.string().required()
        })
    }
}
