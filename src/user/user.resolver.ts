import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UserOutput } from './dto/user.output';
import { UserService } from './user.service';
import { ID } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Mutation(() => UserOutput)
  async createUser(
    @Args({ name: 'user', type: () => CreateUserInput }) dto: CreateUserInput,
  ) {
    return await this.userService.create(dto);
  }

  @Query(() => UserOutput)
  async me(@Args({ name: 'id', type: () => ID }) id: number) {
    return await this.userService.me(Number(id));
  }
}
