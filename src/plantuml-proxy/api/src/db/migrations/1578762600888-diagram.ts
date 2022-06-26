import { MigrationInterface, QueryRunner } from "typeorm";

export class diagram1578762600888 implements MigrationInterface {
  name = "diagram1578762600888";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "diagram" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" character varying(500) NOT NULL, "UMLAccountId" character varying(400) NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "diagram"`, undefined);
  }
}
