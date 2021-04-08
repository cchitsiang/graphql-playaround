import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';
import { Post } from './post.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  @Directive('@external')
  public id: number;

  @Field(() => [Post])
  public posts: Post[];
}