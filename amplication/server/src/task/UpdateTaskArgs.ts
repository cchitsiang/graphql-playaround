import { ArgsType, Field } from "@nestjs/graphql";
import { TaskWhereUniqueInput } from "./TaskWhereUniqueInput";
import { TaskUpdateInput } from "./TaskUpdateInput";

@ArgsType()
class UpdateTaskArgs {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  where!: TaskWhereUniqueInput;
  @Field(() => TaskUpdateInput, { nullable: false })
  data!: TaskUpdateInput;
}

export { UpdateTaskArgs };
