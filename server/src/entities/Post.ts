import { Entity, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity } from "./Base";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @Property({ type: "text" })
  title!: string;
}
