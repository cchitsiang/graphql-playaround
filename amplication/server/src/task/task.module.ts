import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { TaskResolver } from "./task.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskResolver],
  exports: [TaskService],
})
export class TaskModule {}
