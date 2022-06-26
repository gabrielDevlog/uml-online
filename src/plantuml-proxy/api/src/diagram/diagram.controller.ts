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
import {
  DiagramCreateDTO,
  RenderDiagramErrorDTO
} from "plantuml-proxy-shared/dtos/diagram";
import { DiagramService } from "./diagram.service";
import { Diagram } from "./diagram.entity";
import { BearerToken } from "../common/bearer-token.decorator";
import { JwtPayload } from "uml-jwt";
import { RenderUmlService } from "./render-uml.service";

@Controller("diagrams")
export class DiagramController {
  constructor(
    private readonly diagramService: DiagramService,
    private readonly renderUmlService: RenderUmlService
  ) {}

  @Get()
  findAll(@BearerToken() jwt: JwtPayload): Promise<Diagram[]> {
    return this.diagramService.find(jwt.accountId);
  }

  @Get("/:id")
  async findOne(
    @Param() params: any,
    @BearerToken() jwt: JwtPayload | null,
    @Headers("x-uml-access-granted") accessGrantedFromPreviousAuth: string
  ): Promise<Diagram> {
    const diagram = await this.diagramService.findOne(params.id);
    if (!diagram) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }

    const isOwner = jwt && diagram.UMLAccountId !== jwt.accountId;
    if (!isOwner && accessGrantedFromPreviousAuth !== "true") {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }

    return diagram;
  }

  @Get("/:id/render")
  async renderUml(
    @Param() params: any,
    @BearerToken() jwt: JwtPayload | null,
    @Headers("x-uml-access-granted") accessGrantedFromPreviousAuth: string
  ): Promise<string> {
    const diagram = await this.diagramService.findOne(params.id);
    if (!diagram) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }

    const isOwner = jwt && diagram.UMLAccountId !== jwt.accountId;
    if (!isOwner && accessGrantedFromPreviousAuth !== "true") {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }

    const result = await this.renderUmlService.toImage(diagram.data);

    /**
     * an error can occured when rendering,
     * in that case, result will be an object describing the error
     * We rethrow it as a BadRequest
     */
    if (typeof result === "object") {
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post()
  create(
    @Body() dto: DiagramCreateDTO,
    @BearerToken() jwt: JwtPayload
  ): Promise<Diagram> {
    return this.diagramService.create(jwt.accountId, dto.title, dto.data);
  }

  @Post("/render")
  async render(@Body("data") data: string) {
    const result = await this.renderUmlService.toImage(data);

    /**
     * an error can occured when rendering,
     * in that case, result will be an object describing the error
     * We rethrow it as a BadRequest
     */
    if (typeof result === "object") {
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Put("/:id")
  async update(
    @Param() params: any,
    @Body() dto: DiagramCreateDTO,
    @BearerToken() jwt: JwtPayload
  ): Promise<Diagram> {
    const diagram = await this.diagramService.findOne(params.id);

    if (!diagram) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }

    if (diagram.UMLAccountId !== jwt.accountId) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }

    diagram.title = dto.title;
    diagram.data = dto.data;
    return this.diagramService.updateOne(diagram);
  }
}
