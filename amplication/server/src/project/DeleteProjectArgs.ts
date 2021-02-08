import { ArgsType, Field } from "@nestjs/graphql";
import { ProjectWhereUniqueInput } from "./ProjectWhereUniqueInput";

@ArgsType()
class DeleteProjectArgs {
  @Field(() => ProjectWhereUniqueInput, { nullable: false })
  where!: ProjectWhereUniqueInput;
}

export { DeleteProjectArgs };
