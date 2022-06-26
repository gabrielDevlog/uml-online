import { MigrationInterface, QueryRunner } from "typeorm";

export class diagramTitle1582463516687 implements MigrationInterface {
  name = "diagramTitle1582463516687";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "diagram" ADD "title" character varying(500)`,
      undefined
    );

    await queryRunner.query(
      `UPDATE "diagram" SET "title"='not_defined'`,
      undefined
    );

    await queryRunner.query(
      `ALTER TABLE "diagram" ALTER COLUMN "title" SET NOT NULL;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "diagram" DROP COLUMN "title"`,
      undefined
    );
  }
}
