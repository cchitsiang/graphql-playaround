import { ArgsType, Field } from "@nestjs/graphql";
import { ProjectCreateInput } from "./ProjectCreateInput";

@ArgsType()
class CreateProjectArgs {
  @Field(() => ProjectCreateInput, { nullable: false })
  data!: ProjectCreateInput;
}

export { CreateProjectArgs };
