const zlib = require('zlib')

exports.inflate = function inflate(data) {
    return zlib.gzipSync(data)
}

exports.deflate = function deflate(data) {
    return zlib.unzipSync(data)
}
