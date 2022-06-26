import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtCustomPayload } from "uml-jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Create a Jwt of given payload
   * @param payload
   */
  createJwt(payload: JwtCustomPayload) {
    return this.jwtService.signAsync(payload);
  }
}
