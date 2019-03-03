const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

// Initialize the app
const app = express();

// The GraphQL endpoint
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Use the react build folder to serve those static files
app.use(express.static(path.join(__dirname, '../', 'build')));

// API
app.get('/api/rest/v1', function (req, res) {
  res.send(JSON.stringify({ version: 3.0 }));
});

// Start the server
app.listen(80, () => {
  console.log('Server is ready http://localhost:80/');
});
