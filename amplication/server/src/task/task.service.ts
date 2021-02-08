import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneTaskArgs,
  FindManyTaskArgs,
  TaskCreateArgs,
  TaskUpdateArgs,
  TaskDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyTaskArgs>(args: Subset<T, FindManyTaskArgs>) {
    return this.prisma.task.findMany(args);
  }
  findOne<T extends FindOneTaskArgs>(args: Subset<T, FindOneTaskArgs>) {
    return this.prisma.task.findOne(args);
  }
  create<T extends TaskCreateArgs>(args: Subset<T, TaskCreateArgs>) {
    return this.prisma.task.create<T>(args);
  }
  update<T extends TaskUpdateArgs>(args: Subset<T, TaskUpdateArgs>) {
    return this.prisma.task.update<T>(args);
  }
  delete<T extends TaskDeleteArgs>(args: Subset<T, TaskDeleteArgs>) {
    return this.prisma.task.delete(args);
  }
}
