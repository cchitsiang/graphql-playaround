import { ArgsType, Field } from "@nestjs/graphql";
import { ProjectWhereUniqueInput } from "./ProjectWhereUniqueInput";
import { ProjectUpdateInput } from "./ProjectUpdateInput";

@ArgsType()
class UpdateProjectArgs {
  @Field(() => ProjectWhereUniqueInput, { nullable: false })
  where!: ProjectWhereUniqueInput;
  @Field(() => ProjectUpdateInput, { nullable: false })
  data!: ProjectUpdateInput;
}

export { UpdateProjectArgs };
