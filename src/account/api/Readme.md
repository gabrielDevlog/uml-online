# Uml project - account

Service responsible for authentification, emitting & validating JWT

## Database bootstraping

This service creates it's own database. For this we leverage typeorm & npm pre hook. See file `src/db/migrations/0-createDatabase.ts`.

Database bootstraping & migrations are run during predev & prestart hooks.

## Migrating db with typeorm

We use typeorm to handle db migrations. As typeorm can not read .ts file, we use ts-node to execture typeorm cli. This means that in prod, `npm run typeorm` commands are not available.

We still transpile all typeorm related files, so you should be be able to use `npm typeorm` to execute typeorm on js files.

Typeorm cli config is in `src/db/ormconfig.ts`. We can use ts files for migration & config, as typeorm cli is called via ts-node (see package.json => scripts => typeorm)

To create an empy migration: `npm run typeorm migration:create -- -n migrationName`

To run all pending migrations: `npm run typeorm migration:run`. Notice that `npm run start` already run all migrations (it's in typeorm.module config, in app.module.ts)

To revert last migration: `npm run typeorm migration:revert`. In production environment, try: `npx typeorm migration:revert --config dist/db/ormconfig`
