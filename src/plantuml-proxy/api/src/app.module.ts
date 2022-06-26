import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiagramModule } from "./diagram/diagram.module";
import { config } from "./config";
import { Diagram } from "./diagram/diagram.entity";
import { PublicModule } from "./public/public.module";

@Module({
  imports: [
    DiagramModule,
    PublicModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: config.postgresql.host,
      port: config.postgresql.port,
      username: config.postgresql.user,
      password: config.postgresql.password,
      database: config.postgresql.db,
      entities: [Diagram] // We have to explicilty list all entities, cause at build time webpack put them in the bundle
    })
  ]
})
export class AppModule {}
