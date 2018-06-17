// Separating server.js and app.js allows Jest tests to terminate gracefully
var app = require('./app.js');

app.listen(3000, function () {
    console.log("Express server listening on port 3000");
});