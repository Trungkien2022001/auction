const Joi = require('@hapi/joi')

module.exports = {
    get: {
        query: Joi.object().keys({
            user_id: Joi.string().required(),
            offset: Joi.string().optional(),
            limit: Joi.string().optional()
        })
    }
}
