import { MigrationInterface, QueryRunner } from "typeorm";

export class resource1581194562695 implements MigrationInterface {
  name = "resource1581194562695";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TYPE "resource_visibility_enum" AS ENUM('Private', 'Public')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "resource" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "UMLResourceURI" character varying(500) NOT NULL, "UMLAccountId" uuid NOT NULL, "visibility" "resource_visibility_enum" NOT NULL, CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "resource"`, undefined);
    await queryRunner.query(`DROP TYPE "resource_visibility_enum"`, undefined);
  }
}
