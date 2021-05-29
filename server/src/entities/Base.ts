import { PrimaryKey, Entity, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

@ObjectType({ isAbstract: true })
@Entity()
export abstract class BaseEntity {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
