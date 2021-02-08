import { ArgsType, Field } from "@nestjs/graphql";
import { TaskCreateInput } from "./TaskCreateInput";

@ArgsType()
class CreateTaskArgs {
  @Field(() => TaskCreateInput, { nullable: false })
  data!: TaskCreateInput;
}

export { CreateTaskArgs };
