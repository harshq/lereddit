import { Entity, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity } from "./Base";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @Property({ type: "text", unique: true })
  username!: string;

  @Field()
  @Property({ type: "text" })
  email!: string;

  @Property({ type: "text" })
  password!: string;
}

