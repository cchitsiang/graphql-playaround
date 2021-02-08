import { ArgsType, Field } from "@nestjs/graphql";
import { TaskWhereInput } from "./TaskWhereInput";

@ArgsType()
class FindManyTaskArgs {
  @Field(() => TaskWhereInput, { nullable: true })
  where?: TaskWhereInput;
}

export { FindManyTaskArgs };
