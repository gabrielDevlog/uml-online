import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * An account represent a unique access
 */
@Entity()
export class Account {
  /**
   * Auto generated id
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /**
   * Account email, for login
   */
  @Column({ length: 500 })
  email: string;

  /**
   * Account password
   */
  @Column({ length: 400 })
  password: string;

  /**
   * date of deletion
   */
  @Column("date", { nullable: true })
  deletedAt: Date | null;
}
