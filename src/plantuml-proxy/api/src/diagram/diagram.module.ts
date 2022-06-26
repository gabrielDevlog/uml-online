import { Module, Render } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiagramController } from "./diagram.controller";
import { DiagramService } from "./diagram.service";
import { Diagram } from "./diagram.entity";
import { RenderUmlService } from "./render-uml.service";

@Module({
  imports: [TypeOrmModule.forFeature([Diagram])],
  controllers: [DiagramController],
  providers: [DiagramService, RenderUmlService],
  exports: [RenderUmlService]
})
export class DiagramModule {}
