/* eslint-disable no-await-in-loop */
const Promise = require('bluebird')
const { logger } = require('../api/utils/winston')
const request = Promise.promisifyAll(require('request'))

const count = process.argv.slice(2)
async function get(n) {
    const s = parseInt(n[1], 10) || 100
    const arr = []
    for (let i = 0; i < s; i += 1) {
        arr.push(i)
    }
    let url = "http://localhost:5050"
    while (true) {
        await Promise.all(
            arr.map(async () => {
                const options = {
                    gzip: true,
                    headers: {
                        Accept: 'gzip, deflate, br',
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'Accept-Encoding': 'gzip, deflate, br',
                    }
                }
                await request.getAsync(url, options)
            })
        ).catch(e => {
            logger.err(e)
        })
        console.log(`success ${s} request`)
    }
}
get(count)
