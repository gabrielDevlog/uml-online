import { IsString, IsNotEmpty } from "class-validator";

/**
 * A diagram
 */
export interface DiagramDTO {
  id: string;
  title: string;
  data: string;
}

/**
 * Data needed to create a diagram
 */
export class DiagramCreateDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  data: string;
}

/**
 * An error that occured when parsing text
 */
export interface RenderDiagramErrorDTO {
  /**
   * Line where the error occured
   */
  line: number;

  /**
   * Message describing the error
   */
  message: string;
}
