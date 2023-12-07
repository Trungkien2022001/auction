const BaseJoi = require('@hapi/joi')
const Extension = require('@hapi/joi-date')

const Joi = BaseJoi.extend(Extension)
const send = Joi.object().keys({
    email: Joi.string().required()
})

module.exports = {
    sendSchema: {
        body: send
    }
}
