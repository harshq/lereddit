import { User } from "../entities/User";
import { Context } from "../types/context";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { createAccessToken, createRefreshToken } from "../utils/jwt";

@ObjectType()
class LoginResponse {
  @Field(() => User)
  user: User;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: Context) {
    const userId = req.user && req.user.id;
    if (!userId) {
      return null;
    }

    return em.findOne(User, { id: userId });
  }

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

  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { em }: Context
  ): Promise<LoginResponse | null> {
    try {
      const user = await em.findOneOrFail(User, { username });
      const matchPasswords = await argon2.verify(user.password, password);
      if (matchPasswords) {
        const accessToken = createAccessToken({ id: user.id });
        const refreshToken = createRefreshToken({ id: user.id });
        return {
          user,
          accessToken,
          refreshToken,
        };
      } else {
        throw Error();
      }
    } catch (error) {
      return null;
    }
  }
}
