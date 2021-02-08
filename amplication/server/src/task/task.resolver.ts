import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { TaskService } from "./task.service";
import { CreateTaskArgs } from "./CreateTaskArgs";
import { UpdateTaskArgs } from "./UpdateTaskArgs";
import { DeleteTaskArgs } from "./DeleteTaskArgs";
import { FindManyTaskArgs } from "./FindManyTaskArgs";
import { FindOneTaskArgs } from "./FindOneTaskArgs";
import { Task } from "./Task";
import { User } from "../user/User";
import { Project } from "../project/Project";

@graphql.Resolver(() => Task)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TaskResolver {
  constructor(
    private readonly service: TaskService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Task])
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "read",
    possession: "any",
  })
  async tasks(
    @graphql.Args() args: FindManyTaskArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Task[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Task",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Task, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "read",
    possession: "own",
  })
  async task(
    @graphql.Args() args: FindOneTaskArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Task | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Task",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Task)
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "create",
    possession: "any",
  })
  async createTask(
    @graphql.Args() args: CreateTaskArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Task> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Task",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Task"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        assignedTo: args.data.assignedTo
          ? {
              connect: args.data.assignedTo,
            }
          : undefined,

        project: {
          connect: args.data.project,
        },
      },
    });
  }

  @graphql.Mutation(() => Task)
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "update",
    possession: "any",
  })
  async updateTask(
    @graphql.Args() args: UpdateTaskArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Task | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Task",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Task"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          assignedTo: args.data.assignedTo
            ? {
                connect: args.data.assignedTo,
              }
            : undefined,

          project: {
            connect: args.data.project,
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Task)
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "delete",
    possession: "any",
  })
  async deleteTask(@graphql.Args() args: DeleteTaskArgs): Promise<Task | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Task,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .assignedTo();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Project, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "read",
    possession: "any",
  })
  async project(
    @graphql.Parent() parent: Task,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Project | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Project",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .project();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
