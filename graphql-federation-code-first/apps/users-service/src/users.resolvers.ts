import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Resolver(() => User)
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async getUser(@Args('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @ResolveReference()
  async ResolveReference(reference: { __typename: string; id: number }): Promise<User> {
    return this.usersService.findById(+reference.id);
  }
}
