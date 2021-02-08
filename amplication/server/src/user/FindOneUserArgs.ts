import { ArgsType, Field } from "@nestjs/graphql";
import { UserWhereUniqueInput } from "./UserWhereUniqueInput";

@ArgsType()
class FindOneUserArgs {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  where!: UserWhereUniqueInput;
}

export { FindOneUserArgs };
