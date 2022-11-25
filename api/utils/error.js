/* eslint-disable func-names */
const { AssertionError } = require('assert')

const internals = {
    system: [
        // JavaScript
        EvalError,
        RangeError,
        ReferenceError,
        SyntaxError,
        TypeError,
        URIError,
        // Node
        AssertionError
    ]
}

const createErrorClass = require('create-error-class')

/* An original error was returned from a third party supplier API */
const Error = createErrorClass('DevError', function(err) {
    this.code = err.code
    this.message = err.message
})

function isSystemError(err) {
    for (let i = 0; i < internals.system.length; i += 1) {
        if (err instanceof internals.system[i]) {
            return true
        }
    }

    return false
}

module.exports = {
    isSystemError,
    Error
}
