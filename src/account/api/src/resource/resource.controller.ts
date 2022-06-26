import { Controller, Get, Query, Post, Body } from "@nestjs/common";
import { ResourceService } from "./resource.service";
import { JwtPayload, JwtCustomPayload } from "uml-jwt";
import { ResourceDTO, ResourceCreateDTO } from "account-shared/dtos/resource";
import { BearerToken } from "../common/bearer-token.decorator";

@Controller("resources")
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get()
  async findAll(
    @BearerToken() jwt: JwtPayload,
    @Query("UMLResourceURI") UMLResourceURI: string
  ): Promise<ResourceDTO[]> {
    const where = UMLResourceURI
      ? { UMLAccountId: jwt.accountId, UMLResourceURI: UMLResourceURI }
      : { UMLAccountId: jwt.accountId };

    const resources = await this.resourceService.find(where);

    return resources.map(resource => ({
      id: resource.id,
      visibility: resource.visibility
    }));
  }

  @Post()
  async createResource(
    @Body() dto: ResourceCreateDTO,
    @BearerToken() jwt: JwtCustomPayload
  ): Promise<ResourceDTO> {
    const resource = await this.resourceService.create(
      jwt.accountId,
      dto.resourceURI,
      dto.visibility
    );

    return {
      id: resource.id,
      visibility: resource.visibility
    };
  }
}
