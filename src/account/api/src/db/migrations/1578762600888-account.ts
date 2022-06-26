import { MigrationInterface, QueryRunner } from "typeorm";

export class account1578762600888 implements MigrationInterface {
  name = "account1578762600888";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(500) NOT NULL, "password" character varying(400) NOT NULL, "deletedAt" date, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "account"`, undefined);
  }
}
