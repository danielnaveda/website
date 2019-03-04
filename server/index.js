const express = require('express');
const path = require('path');
const dgraph = require("dgraph-js-http");
var proxy = require('http-proxy-middleware')

// const clientStub = new dgraph.DgraphClientStub("http://localhost:8080");
// const dgraphClient = new dgraph.DgraphClient(clientStub);
// const schema = "name: string @index(exact) .";
// dgraphClient.alter({ schema: schema });


// Initialize the app
const app = express();

app.get('/api/rest/v1', function (req, res) {
  res.send(JSON.stringify({ version: "1.0.1" }));
});

// Use the react build folder to serve those static files
app.use(express.static(path.join(__dirname, '../', 'build')));

app.use('/query', proxy(
  {
    // target: 'http://localhost:8080',
    target: 'http://server:8080',
    changeOrigin: true,
    logLevel: 'debug'
  }
));

// Start the server
app.listen(80, () => {
  console.log('Server is ready http://localhost:80/');
});
