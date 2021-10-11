const {parentPort} = require('worker_threads')
const utils = require("./utils/utils")

parentPort.on('message', workerMessage => {
    worker(workerMessage);
})

async function worker(data) {
    if (data.data instanceof Object) {
        const promiseArray = data.data.map(url => utils.testUniqueUrl(url))
        let promises = await Promise.all(promiseArray);
        for (let ignored of promises) {
        }

        parentPort.postMessage("Worker #" + data.index + " has finished")
        parentPort.close()
    }
}