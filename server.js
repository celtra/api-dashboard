// server.js

var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(path.join(path.resolve(), 'dist')));
var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server running at port", port);
});