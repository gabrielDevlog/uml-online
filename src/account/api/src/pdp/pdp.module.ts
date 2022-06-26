import { Module } from "@nestjs/common";
import { PdpController } from "./pdp.controller";
import { PdpService } from "./pdp.service";
import { ResourceModule } from "../resource/resource.module";

@Module({
  imports: [ResourceModule],
  controllers: [PdpController],
  providers: [PdpService]
})
export class PdpModule {}
