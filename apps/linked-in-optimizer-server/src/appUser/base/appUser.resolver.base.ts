/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AppUser } from "./AppUser";
import { AppUserCountArgs } from "./AppUserCountArgs";
import { AppUserFindManyArgs } from "./AppUserFindManyArgs";
import { AppUserFindUniqueArgs } from "./AppUserFindUniqueArgs";
import { CreateAppUserArgs } from "./CreateAppUserArgs";
import { UpdateAppUserArgs } from "./UpdateAppUserArgs";
import { DeleteAppUserArgs } from "./DeleteAppUserArgs";
import { ProfileOptimizationFindManyArgs } from "../../profileOptimization/base/ProfileOptimizationFindManyArgs";
import { ProfileOptimization } from "../../profileOptimization/base/ProfileOptimization";
import { SessionFindManyArgs } from "../../session/base/SessionFindManyArgs";
import { Session } from "../../session/base/Session";
import { AppUserCreateInput } from "./AppUserCreateInput";
import { AppUserWhereUniqueInput } from "./AppUserWhereUniqueInput";
import { AppUserUpdateInput } from "./AppUserUpdateInput";
import { AppUserService } from "../appUser.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => AppUser)
export class AppUserResolverBase {
  constructor(
    protected readonly service: AppUserService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "AppUser",
    action: "read",
    possession: "any",
  })
  async _appUsersMeta(
    @graphql.Args() args: AppUserCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [AppUser])
  @nestAccessControl.UseRoles({
    resource: "AppUser",
    action: "read",
    possession: "any",
  })
  async appUsers(
    @graphql.Args() args: AppUserFindManyArgs
  ): Promise<AppUser[]> {
    return this.service.appUsers(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => AppUser, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "AppUser",
    action: "read",
    possession: "own",
  })
  async appUser(
    @graphql.Args() args: AppUserFindUniqueArgs
  ): Promise<AppUser | null> {
    const result = await this.service.appUser(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => AppUser)
  @nestAccessControl.UseRoles({
    resource: "AppUser",
    action: "create",
    possession: "any",
  })
  async createAppUser(
    @graphql.Args() args: CreateAppUserArgs
  ): Promise<AppUser> {
    return await this.service.createAppUser({
      ...args,
      data: args.data,
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => AppUser)
  @nestAccessControl.UseRoles({
    resource: "AppUser",
    action: "update",
    possession: "any",
  })
  async updateAppUser(
    @graphql.Args() args: UpdateAppUserArgs
  ): Promise<AppUser | null> {
    try {
      return await this.service.updateAppUser({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => AppUser)
  @nestAccessControl.UseRoles({
    resource: "AppUser",
    action: "delete",
    possession: "any",
  })
  async deleteAppUser(
    @graphql.Args() args: DeleteAppUserArgs
  ): Promise<AppUser | null> {
    try {
      return await this.service.deleteAppUser(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [ProfileOptimization], {
    name: "profileOptimizations",
  })
  @nestAccessControl.UseRoles({
    resource: "ProfileOptimization",
    action: "read",
    possession: "any",
  })
  async findProfileOptimizations(
    @graphql.Parent() parent: AppUser,
    @graphql.Args() args: ProfileOptimizationFindManyArgs
  ): Promise<ProfileOptimization[]> {
    const results = await this.service.findProfileOptimizations(
      parent.id,
      args
    );

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Session], { name: "sessions" })
  @nestAccessControl.UseRoles({
    resource: "Session",
    action: "read",
    possession: "any",
  })
  async findSessions(
    @graphql.Parent() parent: AppUser,
    @graphql.Args() args: SessionFindManyArgs
  ): Promise<Session[]> {
    const results = await this.service.findSessions(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @graphql.Mutation(() => AppUser)
  async CreateAppUser(
    @graphql.Args()
    args: AppUserCreateInput
  ): Promise<AppUser> {
    return this.service.CreateAppUser(args);
  }

  @graphql.Mutation(() => Boolean)
  async DeleteAppUser(
    @graphql.Args("args")
    args: string
  ): Promise<boolean> {
    return this.service.DeleteAppUser(args);
  }

  @graphql.Query(() => AppUser)
  async GetAppUser(
    @graphql.Args()
    args: AppUserWhereUniqueInput
  ): Promise<AppUser> {
    return this.service.GetAppUser(args);
  }

  @graphql.Mutation(() => AppUser)
  async UpdateAppUser(
    @graphql.Args()
    args: AppUserUpdateInput
  ): Promise<AppUser> {
    return this.service.UpdateAppUser(args);
  }
}
