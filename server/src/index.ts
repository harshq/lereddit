import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __PROD__ } from "./constants";

import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    context: ({ req, res }) => ({ em: orm.em, req, res }),
    schema: await buildSchema({
      resolvers: [__dirname + "/resolvers/**/*.js"],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.get("/ping", (_, res) => res.send({ server: "pong" }));

  app.listen(4000, () => {
    console.log("Server is up and kicking on localhost:4000");
  });
};

try {
  main();
} catch (error) {
  console.error(error);
}
