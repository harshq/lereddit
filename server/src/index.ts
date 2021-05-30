import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __PROD__ } from "./constants";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";

import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient(); 

  const app = express();

  app.use(session({
    name: 'qid',
    store: new RedisStore({
      client: redisClient
    }),
    secret: "reaaaaaalylongsecret",
    resave: false,
    cookie: {
      secure: __PROD__,
      maxAge: 60 * 60 * 24 * 30 * 5, // 5 years
      httpOnly: true,
      sameSite: 'lax'
    },
    saveUninitialized: false
  }))

  const apolloServer = new ApolloServer({
    context: ({ req, res }) => ({ em: orm.em, req, res }),
    schema: await buildSchema({
      resolvers: [__dirname + "/resolvers/**/*.js"],
      validate: false,
    }),
    debug: !__PROD__,
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
