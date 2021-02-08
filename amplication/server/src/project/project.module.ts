import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { ProjectResolver } from "./project.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
