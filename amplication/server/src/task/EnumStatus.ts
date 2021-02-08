import { registerEnumType } from "@nestjs/graphql";

export enum EnumStatus {
  New = "new",
  Pending = "pending",
  OnHold = "onHold",
  Ongoing = "ongoing",
  Done = "done",
}

registerEnumType(EnumStatus, {
  name: "EnumStatus",
});
