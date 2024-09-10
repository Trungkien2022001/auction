const { redis } = require('./connectors')
const { sleep } = require('./utils/common')
const { logger } = require('./utils/winston')

async function handleJob(userID) {
    logger.info(`Job executing for user ${userID}`)
    await sleep(1000)
    logger.info('Job success!......')
}

async function loopbackCheck(ticketId, userID) {
    const workingKey = `auction:raise:${ticketId}`
    const res = await redis.set(workingKey, '1', 'NX', 'PX', 50000)
    if (res !== 'OK') {
        await sleep(200)
        loopbackCheck(ticketId, userID)
    } else {
        await handleJob(userID)
        await redis.del(workingKey)
    }
}
async function run() {
    await Promise.all(
        Array(1000)
            .fill(1)
            .map(async (item, index) => {
                await loopbackCheck(1234, index)
            })
    )
}

run()
