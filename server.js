// server.js
var PRODUCTION = true;

var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();

if (PRODUCTION) {
    app.use(serveStatic(path.join(path.resolve(), 'dist')));
}
else {
    app.use(serveStatic(__dirname + "/dist"));
}

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server running at port", port);
});