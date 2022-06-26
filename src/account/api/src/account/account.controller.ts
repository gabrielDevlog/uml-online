import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseGuards
} from "@nestjs/common";
import { AccountDTO } from "account-shared/dtos/account";
import { AccountService } from "./account.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("/:id")
  async findOne(@Param() params: any): Promise<AccountDTO> {
    const account = await this.accountService.findOne(params.id);

    if (!account) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }

    // TODO: ts should enforce this
    delete account.password;

    return account;
  }
}
