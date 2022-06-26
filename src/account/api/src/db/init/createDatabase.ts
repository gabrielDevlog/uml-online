import { Client } from "pg";
import { config } from "../../config";

/**
 * This script create a database if it does not exists
 * It's meant to be launch with npm pre hook, that's why we use process.exit
 * once all operations are done
 */

/**
 * Create a database if it does not exists
 */
async function createDbIfNotExists() {
  const client = new Client({
    host: process.env.POSTGRESQL_HOST as string,
    port: parseInt(process.env.POSTGRESQL_PORT as string, 10),
    user: process.env.POSTGRESQL_USER as string,
    password: process.env.POSTGRESQL_PASSWORD as string,
    database: "postgres" // We connect here as our service database might not exists
  });

  await client.connect();

  console.log(
    `[Migrations/0] Checking if database ${config.postgresql.db} exists`
  );

  const result = await client.query(
    `SELECT * FROM pg_database WHERE datname = '${config.postgresql.db}'`
  );

  if (result.rows.length === 0) {
    console.log("[Migrations/0] Database do not exists, creating it...");
    await client.query(`CREATE DATABASE ${config.postgresql.db}`);
  }

  console.log("[Migrations/0] Database ready to be used");
  return client.end();
}

createDbIfNotExists()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
