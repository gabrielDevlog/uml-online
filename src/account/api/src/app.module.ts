import { Module } from "@nestjs/common";
import { AccountModule } from "./account/account.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "./config";
import { Account } from "./account/account.entity";
import { ResourceModule } from "./resource/resource.module";
import { Resource } from "./resource/resource.entity";
import { PdpModule } from "./pdp/pdp.module";

@Module({
  imports: [
    AccountModule,
    ResourceModule,
    PdpModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: config.postgresql.host,
      port: config.postgresql.port,
      username: config.postgresql.user,
      password: config.postgresql.password,
      database: config.postgresql.db,
      entities: [Account, Resource] // We have to explicilty list all entities, cause at build time webpack put them in the bundle
    })
  ]
})
export class AppModule {}
