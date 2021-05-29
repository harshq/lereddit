import { User } from "../entities/User";
import { Context } from "../types/context";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(
    @Arg("userId") id: number,
    @Ctx() { em }: Context
  ): Promise<User | null> {
    return em.findOne(User, { id });
  }

  @Query(() => [User])
  async users(@Ctx() { em }: Context): Promise<User[]> {
    return em.find(User, {});
  }

  @Mutation(() => User, { nullable: true })
  async createUser(
    @Arg("username") username: string,
    @Arg("email", { validate: true }) email: string,
    @Arg("password") password: string,
    @Ctx() { em }: Context
  ): Promise<User | null> {
    try {
      const hashedPassword = await argon2.hash(password);
      const user = await em.create(User, {
        username,
        email,
        password: hashedPassword,
      });
      await em.persistAndFlush(user);
      return user;
    } catch (error) {
        console.error(error);
      return null;
    }
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { em }: Context
  ): Promise<User | null> {
    try {
      const user = await em.findOneOrFail(User, { username });
      const matchPasswords = await argon2.verify(user.password, password);
      if(matchPasswords) {
        return user;
      } else {
          throw Error();
      }
      
    } catch (error) {
      return null;
    }
  }
}
