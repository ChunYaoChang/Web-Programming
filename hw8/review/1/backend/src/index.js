import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
// import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import ChatBox from './resolvers/ChatBox';
import Message from './resolvers/Message';
import mongo from './mongo';

require('dotenv-defaults').config();

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    // Subscription,
    User,
    ChatBox,
    Message,
  },
  context: {
    db,
    pubsub,
  },
});
// console.log(server)

mongo.connect();

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
