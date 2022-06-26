import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  HttpException,
  HttpStatus,
  Headers
} from "@nestjs/common";
import { DiagramCreateDTO } from "plantuml-proxy-shared/dtos/diagram";
import { BearerToken } from "../common/bearer-token.decorator";
import { JwtPayload } from "uml-jwt";
import { RenderUmlService } from "../diagram/render-uml.service";

@Controller("public")
export class PublicController {
  constructor(private readonly renderUmlService: RenderUmlService) {}

  @Post("/render")
  async render(@Body("data") data: string) {
    const result = await this.renderUmlService.toImage(data);

    /**
     * an error can occur when rendering,
     * in that case, result will be an object describing the error
     * We rethrow it as a BadRequest
     */
    if (typeof result === "object") {
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }

    return result;
  }
}
