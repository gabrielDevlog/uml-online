import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { JwtCustomPayload } from "uml-jwt";
import { PdpService } from "./pdp.service";
import { PdpDTO, AllowedHttpMethods } from "./pdp.dto";
import { BearerToken } from "../common/bearer-token.decorator";
import { ResourceService } from "../resource/resource.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("pdp")
export class PdpController {
  constructor(
    private readonly pdpService: PdpService,
    private readonly resourceService: ResourceService
  ) {}

  @UseGuards(AuthGuard("jwt"))
  @Post()
  async pdpEndpoint(
    @Body() dto: PdpDTO,
    @BearerToken() jwt: JwtCustomPayload | null
  ): Promise<string> {
    console.log("JWT", jwt);
    let canDoThat: boolean = false;
    switch (dto.httpMethod) {
      case AllowedHttpMethods.OPTIONS:
        canDoThat = true;
        break;

      case AllowedHttpMethods.GET:
        const resource = await this.getResourceForPdp(dto);
        canDoThat = resource
          ? this.pdpService.canAccessResource(dto, jwt, resource)
          : this.pdpService.canAccessPrivateResource(dto, jwt);
        break;

      case AllowedHttpMethods.POST:
      case AllowedHttpMethods.PUT:
      case AllowedHttpMethods.PATCH:
        canDoThat = this.pdpService.canAccessPrivateResource(dto, jwt);
        break;

      default:
        canDoThat = false;
    }

    if (!canDoThat) {
      throw new HttpException("FORBIDDEN", HttpStatus.UNAUTHORIZED);
    }

    return "ok";
  }

  getResourceForPdp(dto: PdpDTO) {
    // Match resource name with it's uuid
    // e.g /diagrams/:uuid
    const basePath = /(\/[a-z]+\/[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})/;

    const match = basePath.exec(dto.resourceUrl);
    if (!match) {
      return;
    }

    const resourceURI = match[1];
    console.log(resourceURI);
    return this.resourceService.findOne({
      UMLResourceURI: resourceURI,
    });
  }
}
