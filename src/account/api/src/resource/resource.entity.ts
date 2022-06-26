import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ResourceVisibility } from "account-shared/dtos/resource-visibility.enum";

/**
 * An account represent a unique access
 */
@Entity()
export class Resource {
  /**
   * Auto generated id
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /**
   * Resource uri
   */
  @Column({ length: 500 })
  UMLResourceURI: string;

  /**
   * Owner of this resource id
   * We're not doing a SQL join here, as this entity might move in another service
   */
  @Column({ type: "uuid" })
  UMLAccountId: string;

  /**
   * Visibility of this resource
   */
  @Column({ type: "enum", enum: ResourceVisibility })
  visibility: ResourceVisibility;
}
