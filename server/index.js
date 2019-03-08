const express = require('express');
const path = require('path');
const dgraph = require("dgraph-js-http");
var cors = require('cors')
var proxy = require('http-proxy-middleware')

// TODO: dotenv instead? Pass the URL/Port as env variable?
if (process.env.WEBSITE_ENV == 'production') {
  console.log('We are in production');
  config = {
    dgraphServerUrl: "http://dgraph:8080",
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


app.use(function (req, res, next) {
  console.log(req.headers);

  console.log('Time:', Date.now())
  res.cookie("somethingNew", "Hello my friends")
  // next()
  res.send(JSON.stringify({ version: "1.0.1" }));
});


app.use(cors());

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




app.get('/login', function (req, res) {
  res.send(JSON.stringify({message: "login"}));
});

app.get('/endpoint/private', function (req, res) {
  res.send(JSON.stringify({message: "this is a private endpoint"}));
});

app.get('/endpoint/public', function (req, res) {
  res.send(JSON.stringify({message: "this is a public endpoint"}));
});



// Start the server
app.listen(config.websitePort, () => {
  console.log('Server is ready http://localhost:' + config.websitePort + '/');
});

