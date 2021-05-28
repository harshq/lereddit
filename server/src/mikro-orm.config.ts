import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __PROD__ } from "./constants";
import { Post } from "./entities/Post";

export default {
  dbName: "lereddit",
  type: "postgresql",
  user: "harshanaabeyaratne",
  password: "",
  migrations: {
    path: path.join(__dirname + "/migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  debug: !__PROD__,
  entities: [Post],
} as Parameters<typeof MikroORM.init>[0];
