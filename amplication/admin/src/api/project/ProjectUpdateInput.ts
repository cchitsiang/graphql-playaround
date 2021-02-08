import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ProjectUpdateInput = {
  description?: string | null;
  dueDate?: Date | null;
  location?: string | null;
  name?: string | null;
  owner?: UserWhereUniqueInput;
  startDate?: Date | null;
  type?: "Label1" | null;
};
