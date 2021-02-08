import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import {
  ValidateNested,
  IsOptional,
  IsDate,
  IsInt,
  IsString,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { ProjectWhereUniqueInput } from "../project/ProjectWhereUniqueInput";
import { EnumStatus } from "./EnumStatus";
@ObjectType()
class Task {
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  assignedTo!: UserWhereUniqueInput | null;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  estimation!: number | null;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
  @ApiProperty({
    required: true,
    type: ProjectWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ProjectWhereUniqueInput)
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
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Task };
