import { Module } from '@nestjs/common';
import { PostsResolvers } from './posts.resolvers';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsResolvers, PostsService],
})
export class PostsModule {}
