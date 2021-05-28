import { MikroORM } from "@mikro-orm/core";
import { __PROD__ } from "./constants";

import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/Post";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    context: { em: orm.em },
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false,
    }),
  });

  // const post = await orm.em.create(Post, { title: "My first post!" });
  // await orm.em.persistAndFlush(post);
  // const posts = await orm.em.find(Post, {});
  // console.log(posts);

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
