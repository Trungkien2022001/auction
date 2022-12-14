const moment = require('moment')
const BaseJoi = require('@hapi/joi')
const Extension = require('@hapi/joi-date')

const Joi = BaseJoi.extend(Extension)

const create = Joi.object().keys({
    auction: Joi.object()
        .keys({
            start_time: Joi.date()
                .format('YYYY-MM-DD HH:mm:ss')
                .min(
                    moment()
                        .add(1, 'minutes')
                        .format('YYYY-MM-DD HH:mm:ss')
                )
                .max(
                    moment()
                        .add(7, 'days')
                        .format('YYYY-MM-DD HH:mm:ss')
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
            key_word: Joi.string()
                .optional()
                .allow(null, ''),
            category_id: Joi.number().required(),
            start_price: Joi.number()
                .min(4999)
                .required(),
            images: Joi.array().items(Joi.string().required())
        })
        .required()
})

const getDetail = Joi.object().keys({
    id: Joi.number()
        .min(1)
        .required()
})

const gets = Joi.object().keys({
    // page: Joi.number()
    //     .min(0)
    //     .required(),
    type: Joi.number()
        .min(0)
        .optional(),
    category: Joi.number()
        .min(0)
        .optional()
})

module.exports = {
    create: {
        body: create
    },
    getDetail: {
        header: getDetail
    },
    gets: {
        header: gets
    }
}
