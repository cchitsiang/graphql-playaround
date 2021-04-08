import { Field, ObjectType, Directive, ID } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  public id: number;

  @Field()
  public name: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
