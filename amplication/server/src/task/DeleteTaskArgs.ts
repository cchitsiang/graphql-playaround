import { ArgsType, Field } from "@nestjs/graphql";
import { TaskWhereUniqueInput } from "./TaskWhereUniqueInput";

@ArgsType()
class DeleteTaskArgs {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  where!: TaskWhereUniqueInput;
}

export { DeleteTaskArgs };
