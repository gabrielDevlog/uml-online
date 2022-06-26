import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * An account represent a unique access
 */
@Entity()
export class Diagram {
  /**
   * Auto generated id
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /**
   * title of the diagram
   */
  @Column({ type: "varchar", length: "500" })
  title: string;

  /**
   * Textual description of diagram
   */
  @Column({ type: "text" })
  data: string;

  /**
   * Foreign key to account
   */
  @Column()
  UMLAccountId: string;
}
