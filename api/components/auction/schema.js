const moment = require('moment')
const BaseJoi = require('@hapi/joi')
const Extension = require('@hapi/joi-date')

const Joi = BaseJoi.extend(Extension)

const create = Joi.object().keys({
    auction: Joi.object()
        .keys({
            start_time: Joi.date()
                .format('YYYY-MM-DD[T]HH:mm')
                .min(
                    moment()
                        .add(5, 'minutes')
                        .format('YYYY-MM-DD[T]HH:mm')
                )
                .max(
                    moment()
                        .add(7, 'days')
                        .format('YYYY-MM-DD[T]HH:mm')
                ),
            auction_time: Joi.number().required(),
            is_returned: Joi.number().optional(),
            is_finished_soon: Joi.number().optional()
        })
        .required(),
    product: Joi.object()
        .keys({
            name: Joi.string().required(),
            branch: Joi.string().required(),
            status: Joi.string().required(),
            title: Joi.string()
                .max(300)
                .required(),
            description: Joi.string().required(),
            key_word: Joi.string().optional(),
            category_id: Joi.number().required(),
            starting_price: Joi.number()
                .min(4999)
                .required(),
            images: Joi.array().items(Joi.string().required())
        })
        .required()
})

module.exports = {
    create: {
        body: create
    }
}
