import { ArgsType, Field } from "@nestjs/graphql";
import { TaskWhereUniqueInput } from "./TaskWhereUniqueInput";

@ArgsType()
class FindOneTaskArgs {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  where!: TaskWhereUniqueInput;
}

export { FindOneTaskArgs };
