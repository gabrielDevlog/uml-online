import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  /**
   * Authentication route
   * All logic is done in authGuard
   */
  @UseGuards(AuthGuard("jwt"))
  @Get("/")
  authenticate(@Param() params: any) {}
}
