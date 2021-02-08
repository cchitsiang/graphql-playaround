import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { TaskService } from "./task.service";
import { TaskCreateInput } from "./TaskCreateInput";
import { TaskWhereInput } from "./TaskWhereInput";
import { TaskWhereUniqueInput } from "./TaskWhereUniqueInput";
import { TaskUpdateInput } from "./TaskUpdateInput";
import { Task } from "./Task";

@swagger.ApiBasicAuth()
@swagger.ApiTags("tasks")
@common.Controller("tasks")
export class TaskController {
  constructor(
    private readonly service: TaskService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Task })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: TaskCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Task> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Task",
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
        `providing the properties: ${properties} on ${"Task"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        assignedTo: data.assignedTo
          ? {
              connect: data.assignedTo,
            }
          : undefined,

        project: {
          connect: data.project,
        },
      },
      select: {
        assignedTo: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        estimation: true,
        id: true,

        project: {
          select: {
            id: true,
          },
        },

        startDate: true,
        status: true,
        title: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Task] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: TaskWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Task[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Task",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        assignedTo: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        estimation: true,
        id: true,

        project: {
          select: {
            id: true,
          },
        },

        startDate: true,
        status: true,
        title: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Task",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Task })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: TaskWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Task | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Task",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        assignedTo: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        estimation: true,
        id: true,

        project: {
          select: {
            id: true,
          },
        },

        startDate: true,
        status: true,
        title: true,
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
    resource: "Task",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Task })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: TaskWhereUniqueInput,
    @common.Body()
    data: TaskUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Task | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Task",
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
        `providing the properties: ${properties} on ${"Task"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          assignedTo: data.assignedTo
            ? {
                connect: data.assignedTo,
              }
            : undefined,

          project: {
            connect: data.project,
          },
        },
        select: {
          assignedTo: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          estimation: true,
          id: true,

          project: {
            select: {
              id: true,
            },
          },

          startDate: true,
          status: true,
          title: true,
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
    resource: "Task",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Task })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: TaskWhereUniqueInput
  ): Promise<Task | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          assignedTo: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          estimation: true,
          id: true,

          project: {
            select: {
              id: true,
            },
          },

          startDate: true,
          status: true,
          title: true,
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
