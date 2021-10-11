const utils = require('./utils/utils');
const cpuCount = require('os').cpus().length
const {Worker} = require('worker_threads');
let i = 0;
let index = 0

console.time("main")
main();

function main() {
    utils.decodeJson("./url.json")
        .then(function (array) {
            testAllUrl(array)
        })
        .catch(function (err) {
            console.log(err)
        })
}

function testAllUrl(array) {
    const chunk = utils.splitIntoChunk(array, cpuCount)
    for (let workerArray of chunk) {
        workerSend(workerArray)
        index++
    }
}

function workerSend(array) {
    const worker = new Worker("./worker.js", {})
    worker.postMessage({index: index, data: array})

    worker.on('message', workerMessage => {
        console.log(workerMessage)
    })

    worker.on('error', error => utils.throwError(error))

    worker.on('exit', code => {
        i++
        if (i === index) {
            console.log("finish")
            console.timeEnd("main")
        }
        if (code !== 0) {
            utils.throwError(new Error(`Worker stopped with exit code ${code}`))
        }
    })
}