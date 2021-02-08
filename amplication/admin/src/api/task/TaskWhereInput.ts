import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { ProjectWhereUniqueInput } from "../project/ProjectWhereUniqueInput";

export type TaskWhereInput = {
  assignedTo?: UserWhereUniqueInput | null;
  createdAt?: Date;
  estimation?: number | null;
  id?: string;
  project?: ProjectWhereUniqueInput;
  startDate?: Date;
  status?: "new" | "pending" | "onHold" | "ongoing" | "done";
  title?: string;
  updatedAt?: Date;
};
