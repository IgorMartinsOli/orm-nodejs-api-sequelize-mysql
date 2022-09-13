const bodyParser = require('body-parser')
const pessoas = require('./pessoas-route')

module.exports = app => {
    app.use(bodyParser.json());
    app.use(pessoas)
}