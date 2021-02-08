import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Project = {
  createdAt: Date;
  description: string | null;
  dueDate: Date | null;
  id: string;
  location: string | null;
  name: string | null;
  owner: UserWhereUniqueInput;
  startDate: Date | null;
  type: "Label1" | null;
  updatedAt: Date;
};
