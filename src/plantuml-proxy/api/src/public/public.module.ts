import { Module } from "@nestjs/common";
import { PublicController } from "./diagram.controller";
import { DiagramModule } from "../diagram/diagram.module";

@Module({
  imports: [DiagramModule],
  controllers: [PublicController]
})
export class PublicModule {}
