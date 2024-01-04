/* eslint-disable no-await-in-loop */
const Promise = require('bluebird')
const request = Promise.promisifyAll(require('request'))

const count = process.argv.slice(2)
async function get(n) {
    const s = parseInt(n[1], 10) || 100
    const s1 = parseInt(n[0], 10) || 0
    const arr = []
    for (let i = 0; i < s; i += 1) {
        arr.push(i)
    }
    let url
    switch (s1) {
        case 0:
            url = 'http://localhost:3030/health'
            break
        case 1:
            url = 'http://localhost:3030/auction?id=1'
            break
        case 2:
            url = 'http://localhost:8080/health'
            break
        case 3:
            url = 'http://localhost:8080/auction?id=1'
            break

        default:
            url = 'http://localhost:8080/health'
            break
    }
    console.log(url, s)
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
        ).catch(e => {
            console.log(e)
        })
        console.log(`success ${s} request`)
    }
}
// node "e:\Code\Project\auction\api\test.js" 0 100
get(count)
