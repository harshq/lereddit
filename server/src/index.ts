import "dotenv/config";
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __PROD__ } from "./constants";
import expressJwt from "express-jwt";
import { authChecker } from "./utils/auth";

import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from 'cors';

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  app.use(cors({
    origin: "http://localhost:3000"
  }))

  app.use((req, res, next) => {
    const nextFn = () => next();
    expressJwt({
      algorithms: ["HS256"],
      secret: process.env.ACCESS_TOKEN_SECRET as string,
      credentialsRequired: false,
    })(req, res, nextFn)
  });

  const apolloServer = new ApolloServer({
    context: ({ req, res }) => ({ em: orm.em, req, res }),
    schema: await buildSchema({
      resolvers: [__dirname + "/resolvers/**/*.js"],
      validate: false,
      authChecker,
    }),
    debug: !__PROD__,
  });

  apolloServer.applyMiddleware({ app, cors: false });

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
