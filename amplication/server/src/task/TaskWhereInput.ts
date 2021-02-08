import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { Transform, Type } from "class-transformer";
import {
  ValidateNested,
  IsOptional,
  IsDate,
  IsInt,
  IsString,
  IsEnum,
} from "class-validator";
import { ProjectWhereUniqueInput } from "../project/ProjectWhereUniqueInput";
import { EnumStatus } from "./EnumStatus";
@InputType()
class TaskWhereInput {
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  assignedTo?: UserWhereUniqueInput | null;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  createdAt?: Date;
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
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  id?: string;
  @ApiProperty({
    required: false,
    type: ProjectWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => ProjectWhereUniqueInput)
  @IsOptional()
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
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  updatedAt?: Date;
}
export { TaskWhereInput };
