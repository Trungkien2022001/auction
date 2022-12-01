const tracer = require('dd-trace')

function chunkSubstr(str, size) {
    const numChunks = Math.ceil(str.length / size)
    const chunks = new Array(numChunks)

    for (let i = 0, o = 0; i < numChunks; i += 1, o += size) {
        chunks[i] = str.substr(o, size)
    }

    return chunks
}

const maxLogLength = process.env.MAX_LOG_LENGTH
    ? parseInt(process.env.MAX_LOG_LENGTH, 10)
    : 50000

// each method could be no-op which would swallow the init logs or another temporary implementation like `console`.
const logTracer = {
    error: () => {},
    warn: () => {},
    info: () => {},
    debug: () => {},
    fatal: () => {}
}

tracer.init({
    logInjection: true,
    logger: logTracer
})

const pino = require('pino')

const realLogger = pino({
    prettyPrint: !!process.env.PINO_PRETTY_PRINT
})

const { info } = realLogger
realLogger.info = (...props) => {
    if (
        props.length !== 2 ||
        !props[1] ||
        typeof props[1] !== 'string' ||
        typeof props[0] !== 'object' ||
        Array.isArray(props[0]) ||
        props[1].length <= maxLogLength
    ) {
        info.apply(realLogger, props)

        return
    }
    const chunks = chunkSubstr(props[1], maxLogLength)
    const chunkId = Math.floor(Math.random() * 1000000000)
    chunks.forEach((str, idx) => {
        info.apply(realLogger, [
            { ...props[0], __CID: chunkId, __CIDX: idx },
            str
        ])
    })
}
logTracer.error = realLogger.error.bind(realLogger)
logTracer.warn = realLogger.warn.bind(realLogger)
logTracer.info = realLogger.info.bind(realLogger)
logTracer.debug = realLogger.debug.bind(realLogger)
logTracer.fatal = realLogger.fatal.bind(realLogger)

tracer.trace('logger-trace', () => {
    logTracer.info('log trace')
})
module.exports = logTracer
