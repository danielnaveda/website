const express = require('express');
const path = require('path');
const dgraph = require("dgraph-js-http");
var proxy = require('http-proxy-middleware')

if (process.env.WEBSITE_ENV == 'production') {
  console.log('We are in production');
  config = {
    dgraphServerUrl: "http://server:8080",
    websitePort: 80,
  };
} else {
  console.log('We are in development');
  config = {
    dgraphServerUrl: "http://localhost:8080",
    websitePort: 8081,
  };
}

const clientStub = new dgraph.DgraphClientStub(config.dgraphServerUrl);
const dgraphClient = new dgraph.DgraphClient(clientStub);

var fs = require('fs');
var schema = fs.readFileSync(path.join(__dirname, 'dgraph', 'schema.dgraph'), "utf8");
console.log(schema);

dgraphClient.alter({ dropAll: true });
dgraphClient.alter({ schema: schema });


// Initialize the app
const app = express();

app.get('/api/rest/v1', function (req, res) {
  res.send(JSON.stringify({ version: "1.0.1" }));
});

// Use the react build folder to serve those static files
app.use(express.static(path.join(__dirname, '../', 'build')));

app.use('/query', proxy(
  {
    target: config.dgraphServerUrl,
    changeOrigin: true,
    logLevel: 'debug'
  }
));

// Start the server
app.listen(config.websitePort, () => {
  console.log('Server is ready http://localhost:' + config.websitePort + '/');
});
