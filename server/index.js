const express = require('express');
const path = require('path');
var proxy = require('http-proxy-middleware')

// To send custom graphql request
// const { request } = require('graphql-request');

// const query = `{
//   User {
//     name
//   }
// }`

// request('http://localhost:7474/graphql/', query).then(data =>
//   console.log(data)
// )

// Initialize the app
const app = express();

// Use the react build folder to serve those static files
app.use(express.static(path.join(__dirname, '../', 'build')));

app.use('/graphql', proxy(
  {
    target: 'http://localhost:7474',
    changeOrigin: true,
    logLevel: 'debug'
  }
));

// Start the server
app.listen(80, () => {
  console.log('Server is ready http://localhost:80/');
});
