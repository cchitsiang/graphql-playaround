import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import {
  ValidateNested,
  IsOptional,
  IsInt,
  IsDate,
  IsEnum,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { ProjectWhereUniqueInput } from "../project/ProjectWhereUniqueInput";
import { EnumStatus } from "./EnumStatus";
@InputType()
class TaskCreateInput {
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  assignedTo?: UserWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  estimation?: number | null;
  @ApiProperty({
    required: true,
    type: ProjectWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ProjectWhereUniqueInput)
  @Field(() => ProjectWhereUniqueInput)
  project!: ProjectWhereUniqueInput;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  startDate!: Date;
  @ApiProperty({
    required: true,
    enum: EnumStatus,
  })
  @IsEnum(EnumStatus)
  @Field(() => EnumStatus)
  status!: "new" | "pending" | "onHold" | "ongoing" | "done";
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  title!: string;
}
export { TaskCreateInput };
