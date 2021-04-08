import {
  Query,
  Resolver,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { User } from './user.entity';

@Resolver(() => Post)
export class PostsResolvers {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => Post)
  getPost(@Args('id') id: number) {
    return this.postsService.findById(id);
  }

  @ResolveField(() => User)
  user(@Parent() post: Post): any {
    return { __typename: 'User', id: post.userId };
  }
}
