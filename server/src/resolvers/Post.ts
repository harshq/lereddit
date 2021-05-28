import { Post } from "../entities/Post";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "src/types/context";

@Resolver()
export class PostResolver {
  @Query(() => Post, { nullable: true })
  post(
    @Arg("postId") id: number,
    @Ctx() { em }: Context
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Query(() => [Post])
  posts(@Ctx() { em }: Context): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Ctx() { em }: Context
  ): Promise<Post> {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: Context
  ): Promise<Post | null> {
    try {
      const post = await em.findOneOrFail(Post, { id });
      post.title = title;
      await em.flush();
      return post;
    } catch (e) {
      return null;
    }
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("postId") id: number,
    @Ctx() { em }: Context
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Post, { id });
      return true;
  }
}
