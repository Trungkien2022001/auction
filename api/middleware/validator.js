const BaseJoi = require('@hapi/joi')
const DateExt = require('@hapi/joi-date')
const ArrayExt = require('joi-array-extensions')
const _ = require('lodash')

const { logger } = require('../utils/logger')

const Joi = BaseJoi.extend([DateExt, ArrayExt])

const logValidationError = (error, ctx) => {
    if (!error) {
        return
    }

    logger.error(
        {
            src: ctx.path,
            name: 'validation-error',
            acc: ctx.User && ctx.User.email
        },
        JSON.stringify(error.details)
    )
}

const logValidationErrorWithParameters = (error, ctx) => {
    if (!error) {
        return
    }

    const verbosity = !error || error.details
    logger.error(
        {
            method: ctx.path,
            acc: ctx.User.email,
            rid: _.result(ctx.request, 'body.request_id', undefined),
            request: _.result(ctx.request, 'body', undefined),
            gr_rid: ctx.path === '/getrooms' ? ctx.request.id : undefined
        },
        JSON.stringify(verbosity)
    )
}

function validate(schema, handleLogging) {
    return (ctx, next) => {
        const { body } = ctx.request
        const { params, query } = ctx
        console.log(schema)
        const data = {
            body,
            params,
            query
        }

        const positions = Object.keys(schema)
        if (schema.headers) {
            data.headers = _.pick(
                ctx.request.headers,
                Object.keys(schema.headers)
            )
        }

        for (let i = 0; i < positions.length; i += 1) {
            const position = positions[i]
            const structure =
                typeof schema[position] === 'function'
                    ? schema[position](ctx)
                    : schema[position]

            const { error } = Joi.validate(data[position], structure)
            const verbosity = !error || error.details

            if (error) {
                if (handleLogging) {
                    handleLogging(error, ctx)
                }

                ctx.status = 400
                ctx.body = {
                    success: false,
                    request_id: ctx.request.id,
                    message: `(╯°□°）╯︵ ┻━┻ missing or invalid params at${position}`,
                    verbosity
                }

                return null
            }
        }

        return next()
    }
}

module.exports = {
    validate,
    logValidationError,
    logValidationErrorWithParameters
}
