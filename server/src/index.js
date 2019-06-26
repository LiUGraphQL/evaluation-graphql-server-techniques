import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import v8 from "v8";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import context from "./context";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  engine: process.env.ENGINE_API_KEY
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
