import { Field, ObjectType, Directive, Int, ID } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Post {
  @Field()
  public id: number;

  @Field()
  public title: string;

  @Field(() => ID)
  public userId: number;

  @Field(() => User)
  public user?: User;

  constructor(post: Partial<Post>) {
    Object.assign(this, post);
  }
}