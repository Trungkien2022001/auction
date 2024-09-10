const moment = require('moment')
const BaseJoi = require('@hapi/joi')
const Extension = require('@hapi/joi-date')

const Joi = BaseJoi.extend(Extension)
const login = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
})

const signup = Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().required(),
    username: Joi.string()
        .min(4)
        .max(25)
        .required(),
    phone: Joi.string()
        .length(10)
        .optional(),
    password: Joi.string().required(),
    avatar: Joi.string().optional(),
    address: Joi.string().optional(),
    birthday: Joi.date()
        .format('YYYY-MM-DD')
        .max(
            moment()
                .subtract(15, 'years')
                .format('YYYY-MM-DD')
        )
        .error(new Error('Ngày sinh phải trên 15 tuổi'))
        .optional()
})

module.exports = {
    loginSchema: {
        body: login
    },
    signupSchema: {
        body: signup
    }
}
