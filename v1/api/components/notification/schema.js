const Joi = require('@hapi/joi')

module.exports = {
    get: {
        params: Joi.object().keys({
            user_id: Joi.string().required()
        })
    }
}
