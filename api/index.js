const express = require('express');
const routes = require('./routes');
const app = express();

const port = 3000; // default

routes(app);

app.listen(port, (req, res) => {
    console.log('listening on port '+port)
})

module.exports = app;