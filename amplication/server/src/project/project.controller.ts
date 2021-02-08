import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { ProjectService } from "./project.service";
import { ProjectCreateInput } from "./ProjectCreateInput";
import { ProjectWhereInput } from "./ProjectWhereInput";
import { ProjectWhereUniqueInput } from "./ProjectWhereUniqueInput";
import { ProjectUpdateInput } from "./ProjectUpdateInput";
import { Project } from "./Project";

@swagger.ApiBasicAuth()
@swagger.ApiTags("projects")
@common.Controller("projects")
export class ProjectController {
  constructor(
    private readonly service: ProjectService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Project",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Project })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: ProjectCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Project> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Project",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Project"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        owner: {
          connect: data.owner,
        },
      },
      select: {
        createdAt: true,
        description: true,
        dueDate: true,
        id: true,
        location: true,
        name: true,

        owner: {
          select: {
            id: true,
          },
        },

        startDate: true,
        type: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Project",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Project] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: ProjectWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Project[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Project",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        createdAt: true,
        description: true,
        dueDate: true,
        id: true,
        location: true,
        name: true,

        owner: {
          select: {
            id: true,
          },
        },

        startDate: true,
        type: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Project",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Project })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: ProjectWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Project | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Project",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        createdAt: true,
        description: true,
        dueDate: true,
        id: true,
        location: true,
        name: true,

        owner: {
          select: {
            id: true,
          },
        },

        startDate: true,
        type: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Project",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Project })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: ProjectWhereUniqueInput,
    @common.Body()
    data: ProjectUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Project | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Project",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Project"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          owner: {
            connect: data.owner,
          },
        },
        select: {
          createdAt: true,
          description: true,
          dueDate: true,
          id: true,
          location: true,
          name: true,

          owner: {
            select: {
              id: true,
            },
          },

          startDate: true,
          type: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Project",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Project })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: ProjectWhereUniqueInput
  ): Promise<Project | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          createdAt: true,
          description: true,
          dueDate: true,
          id: true,
          location: true,
          name: true,

          owner: {
            select: {
              id: true,
            },
          },

          startDate: true,
          type: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
