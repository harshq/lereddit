import { Post } from "../entities/Post";
import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "src/types/context";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: Context): Promise<Post[]> {
    return em.find(Post, {});
  }
}
