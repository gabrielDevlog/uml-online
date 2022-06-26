import { MigrationInterface, QueryRunner } from "typeorm";

export class diagramText1582104294580 implements MigrationInterface {
  name = "diagramText1582104294580";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "diagram" ALTER COLUMN "data" TYPE text;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "diagram" ALTER COLUMN "data" TYPE character varying(500);`
    );
  }
}
