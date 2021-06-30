import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
} from '@apollo/client';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpUri = process.env.NODE_ENV === 'production'
  ? 'https://ntucsie-badminton.herokuapp.com/'
  : 'http://localhost:5000/';
const wsUri = process.env.NODE_ENV === 'production'
  ? 'wss://ntucsie-badminton.herokuapp.com/'
  : 'ws://localhost:5000/';

const httpLink = new HttpLink({
  uri: httpUri,
});

const wsLink = new WebSocketLink({
  uri: wsUri,
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allUser: {
          merge(existing, incoming) { return incoming; },
        },
        allVideo: {
          merge(existing, incoming) { return incoming; },
        },
        allActivity: {
          merge(existing, incoming) { return incoming; },
        }
      }
    }
  }
})

const client = new ApolloClient({
  link,
  // cache: new InMemoryCache().restore({}),
  cache,
});

ReactDOM.render(
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <CookiesProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </CookiesProvider>
  </MuiPickersUtilsProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
