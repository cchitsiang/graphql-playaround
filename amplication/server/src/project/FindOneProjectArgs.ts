import { ArgsType, Field } from "@nestjs/graphql";
import { ProjectWhereUniqueInput } from "./ProjectWhereUniqueInput";

@ArgsType()
class FindOneProjectArgs {
  @Field(() => ProjectWhereUniqueInput, { nullable: false })
  where!: ProjectWhereUniqueInput;
}

export { FindOneProjectArgs };
