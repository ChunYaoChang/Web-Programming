// TODO
// Setup the GraphQL server
import db from "./db"; // see the README for how to manipulate this object
import { GraphQLServer, PubSub } from "graphql-yoga";
import Query from "./resolvers/Query";
import Person from "./resolvers/Person";
import Mutation from "./resolvers/Mutation";
import Loc from "./resolvers/Loc";
// TODO
// Setup the GraphQL server
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Person,
    Mutation,
    Loc
  },
  context: {
    db,
    pubsub,
  },
});

server.start({ port: 5000 }, () => {
  console.log(`The server is up on port 5000!`);
});
