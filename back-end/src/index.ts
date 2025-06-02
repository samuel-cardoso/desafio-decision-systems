import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/type-defs";
import { resolvers } from "./graphql/resolvers/index";
import { createContext } from "./graphql/context";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

async function startServer() {
  const app: express.Application = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext,
  });

  await server.start();
  server.applyMiddleware({ app: app as any });

  const PORT = process.env.PORT || 4000; // Mudar porta
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
