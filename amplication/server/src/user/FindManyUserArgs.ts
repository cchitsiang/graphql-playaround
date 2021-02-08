import { ArgsType, Field } from "@nestjs/graphql";
import { UserWhereInput } from "./UserWhereInput";

@ArgsType()
class FindManyUserArgs {
  @Field(() => UserWhereInput, { nullable: true })
  where?: UserWhereInput;
}

export { FindManyUserArgs };
