import { ArgsType, Field } from "@nestjs/graphql";
import { ProjectWhereInput } from "./ProjectWhereInput";

@ArgsType()
class FindManyProjectArgs {
  @Field(() => ProjectWhereInput, { nullable: true })
  where?: ProjectWhereInput;
}

export { FindManyProjectArgs };
