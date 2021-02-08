import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import {
  FindOneUserArgs,
  FindManyUserArgs,
  UserCreateArgs,
  UserUpdateArgs,
  UserDeleteArgs,
  Subset,
} from "@prisma/client";

import { PasswordService } from "../auth/password.service";
import { transformStringFieldUpdateInput } from "../prisma.util";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService
  ) {}
  findMany<T extends FindManyUserArgs>(args: Subset<T, FindManyUserArgs>) {
    return this.prisma.user.findMany(args);
  }
  findOne<T extends FindOneUserArgs>(args: Subset<T, FindOneUserArgs>) {
    return this.prisma.user.findOne(args);
  }
  async create<T extends UserCreateArgs>(args: Subset<T, UserCreateArgs>) {
    return this.prisma.user.create<T>({
      ...args,

      data: {
        ...args.data,
        password: await this.passwordService.hash(args.data.password),
      },
    });
  }
  async update<T extends UserUpdateArgs>(args: Subset<T, UserUpdateArgs>) {
    return this.prisma.user.update<T>({
      ...args,

      data: {
        ...args.data,

        password:
          args.data.password &&
          (await transformStringFieldUpdateInput(
            args.data.password,
            (password) => this.passwordService.hash(password)
          )),
      },
    });
  }
  delete<T extends UserDeleteArgs>(args: Subset<T, UserDeleteArgs>) {
    return this.prisma.user.delete(args);
  }
}
