const axios = require("axios");
const fs = require("fs");

module.exports = {
    splitIntoChunk: function (target, size) {
        return target.reduce((previous, current, index) => {
            if (index % (target.length / size) === 0 && index !== 0) previous.push([])
            previous[previous.length - 1].push(current)
            return previous
        }, [[]])
    },


    testUniqueUrl: function (url) {
        return axios.get(url).then(function (response) {
            console.log("[" + response.status + "] " + url)
        }).catch(function (error) {
            console.log("[" + error + "] " + url)
        })
    },

    throwError: function (error) {
        throw error
    },

    decodeJson: function (data) {
        return new Promise((resolve, reject) => {
            fs.readFile(data, "utf8", (err, jsonString) => {
                if (err) {
                    reject("Error while reading the file :", err)
                    return
                }

                try {
                    const json = JSON.parse(jsonString);
                    resolve(json.map(function (item) {
                        return item['url'];
                    }))
                } catch (error) {
                    reject("Error parsing JSON string:", error)
                }
            })
        })
    }
}