import { registerEnumType } from "@nestjs/graphql";

export enum EnumType {
  Label1 = "Label1",
}

registerEnumType(EnumType, {
  name: "EnumType",
});
