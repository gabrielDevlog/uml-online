import { Account } from "../account/account.entity";
import { Resource } from "../resource/resource.entity";

// Use relative paths https://github.com/typeorm/typeorm/issues/2791
module.exports = {
  type: "postgres",
  host: process.env.POSTGRESQL_HOST,
  port: process.env.POSTGRESQL_PORT,
  username: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DB,
  entities: [Account, Resource],
  migrationsTableName: "migrations",
  migrations: ["src/db/migrations/**/*"],
  cli: {
    migrationsDir: "src/db/migrations"
  }
};
