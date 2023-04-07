/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-loop-func */
/* eslint-disable eqeqeq */
/* eslint-disable no-await-in-loop */
const Promise = require('bluebird')
const request = Promise.promisifyAll(require('request'))

const arr = []

for (let i = 0; i < 1000; i += 1) {
    arr.push(i)
}
console.log(arr)
async function get() {
    Promise.props(
        arr.map(async k => {
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
            const data = await request.getAsync(
                'http://localhost:3030/auction?id=1',
                options
            )
            console.log(data.status)
        })
    )
}
get()
