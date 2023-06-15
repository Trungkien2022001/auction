/* eslint-disable no-await-in-loop */
const Promise = require('bluebird')
const request = Promise.promisifyAll(require('request'))

const count = process.argv.slice(2)
async function get(n) {
    const s = parseInt(n[1], 10) || 1000
    const s1 = parseInt(n[0], 10) || 0
    const arr = []
    for (let i = 0; i < s; i += 1) {
        arr.push(i)
    }
    const url = s1
        ? 'http://localhost:3030/auction?id=1'
        : 'http://localhost:3030/health'
    while (true) {
        await Promise.all(
            arr.map(async () => {
                const options = {
                    gzip: true,
                    headers: {
                        Accept: 'gzip, deflate, br',
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'x-key': 'juniper@goquo.com',
                        'x-access-token':
                            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ODMsImVtYWlsIjoianVuaXBlckBnb3F1by5jb20iLCJleHBpcmUiOjE2NzAyOTU0NTl9.Xfzp3oWvMEHVksdLGa_ViM8vtzBEtM69u8cHFt9qY7I'
                    }
                }
                await request.getAsync(url, options)
            })
        )
        console.log('success')
    }
}
// node "e:\Code\Project\auction\api\smallTest.js" 1 100
get(count)
