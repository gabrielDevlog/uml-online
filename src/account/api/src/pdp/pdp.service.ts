import { Injectable } from "@nestjs/common";
import { PdpDTO, AllowedHttpMethods } from "./pdp.dto";
import { JwtCustomPayload } from "uml-jwt";
import { Resource } from "../resource/resource.entity";
import { ResourceVisibility } from "account-shared/dtos/resource-visibility.enum";

@Injectable()
export class PdpService {
  canAccessPrivateResource(dto: PdpDTO, jwt: JwtCustomPayload | null) {
    return jwt != null;
  }

  canAccessResource(
    dto: PdpDTO,
    jwt: JwtCustomPayload | null,
    resource: Resource
  ) {
    if (resource.visibility === ResourceVisibility.Public) {
      return true;
    }

    return this.canAccessPrivateResource(dto, jwt);
  }
}
