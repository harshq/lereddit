import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __PROD__ } from "./constants";

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
  entities: [__dirname + "/entities/**/*.[tj]s"],
} as Parameters<typeof MikroORM.init>[0];
