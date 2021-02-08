import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneProjectArgs,
  FindManyProjectArgs,
  ProjectCreateArgs,
  ProjectUpdateArgs,
  ProjectDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyProjectArgs>(
    args: Subset<T, FindManyProjectArgs>
  ) {
    return this.prisma.project.findMany(args);
  }
  findOne<T extends FindOneProjectArgs>(args: Subset<T, FindOneProjectArgs>) {
    return this.prisma.project.findOne(args);
  }
  create<T extends ProjectCreateArgs>(args: Subset<T, ProjectCreateArgs>) {
    return this.prisma.project.create<T>(args);
  }
  update<T extends ProjectUpdateArgs>(args: Subset<T, ProjectUpdateArgs>) {
    return this.prisma.project.update<T>(args);
  }
  delete<T extends ProjectDeleteArgs>(args: Subset<T, ProjectDeleteArgs>) {
    return this.prisma.project.delete(args);
  }
}
