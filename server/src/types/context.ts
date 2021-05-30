import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Request, Response } from "express";
import { User } from "../entities/User";

export interface Context {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { user?: User };
  res: Response;
}
