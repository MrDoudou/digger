/*const utils = require('./utils/utils');
const cpuCount = require('os').cpus().length
const {Worker} = require('worker_threads');
const urls = require('./url.json')
let i, index = 0;

console.time("main")
createWorker(urls);

function createWorker(array) {
    const chunk = utils.splitIntoChunk(array, cpuCount)
    for (let workerArray of chunk) {
        sendWorker(workerArray)
        index++
    }
}

function sendWorker(array) {
    const worker = new Worker("./worker.js", {})
    worker.postMessage({index: index, data: array})

    worker.on('message', workerMessage => console.log(workerMessage))
    worker.on('error', error => throw error)
    worker.on('exit', code => {
        i++
        if (i === index) {
            console.log("finish")
            console.timeEnd("main")
        }
        if (code !== 0)
            utils.throwError(new Error(`Worker stopped with exit code ${code}`))

    })
}*/

const { Resolver } = require("dns");

// Check connections
/*dns.lookup('etvous.groupagrica.com', (res, error) => {
    console.log(res, error)
    if (error && error.code === 'ENOTFOUND') {
        console.error(
            chalk.red(
                `${lineBreak(1)}${spacing(1)}Please check your internet connection.${lineBreak(1)}`
            )
        );
        process.exit(1);
    }
});*/

/*const resolver = new Resolver();
resolver.resolveTxt('charlesboitel.fr', (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});*/
const dig = require('node-dig-dns')
dig(['google.com', 'ANY'])
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {
        console.log('Error:', err);
    });
