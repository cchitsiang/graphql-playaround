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
class TaskUpdateInput {
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
    required: false,
    type: ProjectWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ProjectWhereUniqueInput)
  @IsOptional()
  @Field(() => ProjectWhereUniqueInput, {
    nullable: true,
  })
  project?: ProjectWhereUniqueInput;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  startDate?: Date;
  @ApiProperty({
    required: false,
    enum: EnumStatus,
  })
  @IsEnum(EnumStatus)
  @IsOptional()
  @Field(() => EnumStatus, {
    nullable: true,
  })
  status?: "new" | "pending" | "onHold" | "ongoing" | "done";
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  title?: string;
}
export { TaskUpdateInput };
