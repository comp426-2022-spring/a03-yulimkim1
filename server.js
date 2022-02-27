const express = require('express')
const app = express()

if (args['port'] === undefined) {
    port = 5000
} else {
    port = args['port']
}

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

app.use(function(req, res) {
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})