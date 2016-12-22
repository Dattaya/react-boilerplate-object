/* eslint-disable no-console */

const express = require('express');
const graphqlExpress = require('graphql-server-express').graphqlExpress;
const graphiqlExpress = require('graphql-server-express').graphiqlExpress;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const bodyParser = require('body-parser');
const argv = require('minimist')(process.argv.slice(2));

const typeDefs = require('./data/schema');
const resolvers = require('./data/resolvers');
const pubsub = require('./pubsub');
const subscriptionMiddleware = require('./middlewares/subscriptionMiddleware');

// get the intended port number, use port 8080 if not provided
const port = argv.port || process.env.PORT || 8080;

const app = express();

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use('/ide', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.use('/', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
}));

const server = app.listen(port, () => {
  console.log(`GraphQL Server is now running on http://localhost:${port}`);

  // Publish new time value each second
  setInterval(() => pubsub.publish('freshTime', Date.now()), 1000);
});

subscriptionMiddleware(server, executableSchema);
