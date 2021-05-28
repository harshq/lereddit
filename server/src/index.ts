import { MikroORM } from "@mikro-orm/core";
import { __PROD__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const post = await orm.em.create(Post, { title: 'My first post!' });
  await orm.em.persistAndFlush(post);

  const posts = await orm.em.find(Post, {})
  console.log(posts);



}

try {
  main();
} catch (error) {
  console.error(error)
}

