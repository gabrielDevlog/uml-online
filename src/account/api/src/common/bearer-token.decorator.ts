import {
  createParamDecorator,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { JwtDecodePayload, JwtPayload } from "uml-jwt";

const jwtRegexp = /^Bearer (.*)$/i;

export const BearerToken = createParamDecorator(
  (data, req): JwtPayload | null => {
    const authorizationHeader =
      req.headers["authorization"] || req.headers["Authorization"];

    if (!authorizationHeader) {
      return null;
    }

    const match = jwtRegexp.exec(authorizationHeader);
    if (!match || !match[1]) {
      throw new HttpException(
        "Bearer token is mandatory",
        HttpStatus.FORBIDDEN
      );
    }

    const decoded = JwtDecodePayload(match[1]);
    if (!decoded) {
      throw new HttpException(
        "Bearer token is unreadable",
        HttpStatus.FORBIDDEN
      );
    }

    return decoded;
  }
);
