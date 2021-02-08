import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { ProjectService } from "./project.service";
import { CreateProjectArgs } from "./CreateProjectArgs";
import { UpdateProjectArgs } from "./UpdateProjectArgs";
import { DeleteProjectArgs } from "./DeleteProjectArgs";
import { FindManyProjectArgs } from "./FindManyProjectArgs";
import { FindOneProjectArgs } from "./FindOneProjectArgs";
import { Project } from "./Project";
import { User } from "../user/User";

@graphql.Resolver(() => Project)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ProjectResolver {
  constructor(
    private readonly service: ProjectService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Project])
  @nestAccessControl.UseRoles({
    resource: "Project",
    action: "read",
    possession: "any",
  })
  async projects(
    @graphql.Args() args: FindManyProjectArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Project[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Project",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Project, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Project",
    action: "read",
    possession: "own",
  })
  async project(
    @graphql.Args() args: FindOneProjectArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Project | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Project",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Project)
  @nestAccessControl.UseRoles({
    resource: "Project",
    action: "create",
    possession: "any",
  })
  async createProject(
    @graphql.Args() args: CreateProjectArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Project> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Project",
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
        `providing the properties: ${properties} on ${"Project"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        owner: {
          connect: args.data.owner,
        },
      },
    });
  }

  @graphql.Mutation(() => Project)
  @nestAccessControl.UseRoles({
    resource: "Project",
    action: "update",
    possession: "any",
  })
  async updateProject(
    @graphql.Args() args: UpdateProjectArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Project | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Project",
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
        `providing the properties: ${properties} on ${"Project"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          owner: {
            connect: args.data.owner,
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

  @graphql.Mutation(() => Project)
  @nestAccessControl.UseRoles({
    resource: "Project",
    action: "delete",
    possession: "any",
  })
  async deleteProject(
    @graphql.Args() args: DeleteProjectArgs
  ): Promise<Project | null> {
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
    resource: "Project",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Project,
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
      .owner();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
