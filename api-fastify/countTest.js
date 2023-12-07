const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));


async function ping(p, hostname) {
    const args = process.argv.slice(2);
    const port = args[0] || p || 3000
    const totalRq = args[1] || 5000

    let url = `http://localhost:${port}`;
    const startTime = Date.now();
    async function sendRequest() {
        const options = {
            gzip: true,
            headers: {
                Accept: 'gzip, deflate, br',
                'Content-Type': 'text/xml;charset=UTF-8',
                'Accept-Encoding': 'gzip, deflate, br',
            },
        };
        
        
        try {
            const result = await request.getAsync(url, options);
        } catch (e) {
            console.log(e);
        }
    }
    for(let i = 1; i < totalRq; i+=1){
        await sendRequest()
    }
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log(`Start send request, host: ${url}, hostname: ${hostname}, Total request: ${totalRq}, Total time: ${formatElapsedTime(elapsedTime)+"s"}`)
}

function formatElapsedTime(elapsedTime) {
    const seconds = Math.floor(elapsedTime / 1000)
    const milliseconds = elapsedTime % 1000

    const formattedTime = `${seconds}.${milliseconds.toString().padStart(3, '0')}`;

    return formattedTime;
}
async function run(){
    await ping(5050, "Fastify");
    await ping(6060, "Express");
    await ping(7070, "Koa");
    await ping(8080, "Hapi");
    await ping(9090, "Nest");
}
run()
