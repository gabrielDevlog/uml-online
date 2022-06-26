import { Injectable } from "@nestjs/common";
import { createParser, ParserError } from "uml-parser";
import { config } from "../config";
import { RenderDiagramErrorDTO } from "plantuml-proxy-shared/dtos/diagram";

const parser = createParser({
  serviceUrl: config.plantuml.url
});

@Injectable()
export class RenderUmlService {
  /**
   * Use internal parser to turn a string into an image
   * @param str
   */
  toImage(str: string): Promise<string | RenderDiagramErrorDTO> {
    return parser.toImage(str).catch((e: ParserError) => {
      return { message: e.message, line: e.line };
    });
  }
}
