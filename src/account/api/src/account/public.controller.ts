import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import {
  AccountCreateDTO,
  AccountLoginDTO,
  AccountDTO
} from "account-shared/dtos/account";
import { AccountService } from "./account.service";
import { AuthService } from "../auth/auth.service";

/**
 * Controller for account public routes
 * like signin and signup
 */
@Controller("public")
export class PublicController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService
  ) {}

  @Post("/account")
  async create(@Body() dto: AccountCreateDTO): Promise<AccountDTO> {
    const account = await this.accountService.findByEmail(dto.email);
    if (account) {
      throw new HttpException("Account already exists", HttpStatus.CONFLICT);
    }

    return this.accountService.create(dto.email, dto.password);
  }

  @Post("/login")
  async login(@Body() dto: AccountLoginDTO): Promise<string> {
    const account = await this.accountService.findByEmail(dto.email);

    if (!account || account.password !== dto.password) {
      throw new HttpException("Wrong login", HttpStatus.UNAUTHORIZED);
    }

    return this.authService.createJwt({
      accountId: account.id,
      email: account.email
    });
  }
}
