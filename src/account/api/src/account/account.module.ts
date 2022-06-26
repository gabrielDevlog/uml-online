import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { AuthModule } from "../auth/auth.module";
import { PublicController } from "./public.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./account.entity";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Account])],
  controllers: [AccountController, PublicController],
  providers: [AccountService]
})
export class AccountModule {}
