const SubscriptionServer = require('subscriptions-transport-ws').SubscriptionServer;
const { SubscriptionManager } = require('graphql-subscriptions');

const pubsub = require('../pubsub');

module.exports = (server, schema) => {
  // More advanced example: https://github.com/apollostack/GitHunt-API/blob/master/api/subscriptions.js
  const subscriptionManager = new SubscriptionManager({ schema, pubsub });

  return new SubscriptionServer(
    { subscriptionManager },
    server
  );
};
