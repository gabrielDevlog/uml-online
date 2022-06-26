import { IsUrl, IsNotEmpty, IsEnum, IsString } from "class-validator";

export enum AllowedHttpMethods {
  OPTIONS = "OPTIONS",
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH"
}

/**
 * Data needed to check access via pdp endpoint
 */
export class PdpDTO {
  /**
   * Host of network which initiated this request
   */
  @IsString()
  @IsNotEmpty()
  requestHost: string;

  /**
   * The resource the initial request wants to access
   */
  @IsString()
  @IsNotEmpty()
  resourceUrl: string;

  /**
   * The http method used by initial request
   */
  @IsEnum(AllowedHttpMethods)
  @IsNotEmpty()
  httpMethod: string;
}
