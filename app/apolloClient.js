import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { Client } from 'subscriptions-transport-ws';
import { print } from 'graphql-tag/printer';

const wsClient = new Client('ws://localhost:3000/graphql', { reconnect: true });

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
});

networkInterface.subscribe = (request, handler) => wsClient.subscribe({
  query: print(request.query),
  variables: request.variables,
}, handler);

networkInterface.unsubscribe = (id) => {
  wsClient.unsubscribe(id);
};

const apollo = new ApolloClient({
  networkInterface,
});

export default apollo;
