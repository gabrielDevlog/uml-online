import { IsString, IsNotEmpty, IsEmail, IsEnum } from "class-validator";
import { ResourceVisibility } from "./resource-visibility.enum";

/**
 * A public representation of a resource
 */
export interface ResourceDTO {
  id: string;
  visibility: ResourceVisibility;
}

export class ResourceCreateDTO {
  @IsString()
  @IsNotEmpty()
  resourceURI: string;

  @IsEnum(ResourceVisibility)
  visibility: ResourceVisibility;
}
