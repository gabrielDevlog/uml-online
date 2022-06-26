import axios, { AxiosError } from "axios";
import { compress } from "./plantUmlEncoder";

export interface Config {
  /**
   * Url of service transforming text into image
   * e.g "http://www.plantuml.com/plantuml"
   */
  serviceUrl: string;
}

/**
 * Description of an error coming from plantuml
 */
export class ParserError extends Error {
  /**
   * Line where the error occured
   */
  line: number;

  /**
   * Message describing the error
   */
  message: string;

  constructor(message: string, line: number) {
    super(message);
    this.line = line;
  }
}

/**
 * Return a parser object, with basic configuration
 */
export function createParser(config: Config) {
  /**
   * Create a ParserError given an axios error
   */
  function createParserError(error: AxiosError<string>): ParserError {
    if (!error.response) {
      console.error(error);
      return new ParserError("Error unknown", 0);
    }

    const headers = error.response.headers;

    const line = parseInt(headers["x-plantuml-diagram-error-line"], 10);
    const message = headers["x-plantuml-diagram-error"];

    return new ParserError(message, line);
  }

  /**
   * Send a request to plantUml server to transform a text into a svg
   */
  async function toSvg(encodedStr: string) {
    const baseUrl = config.serviceUrl + "/svg/";

    try {
      const resp = await axios.get<string>(baseUrl + encodedStr);
      return resp.data;
    } catch (e) {
      const parserError = createParserError(e);
      throw parserError;
    }
  }

  /**
   * Take a text as input and turn it into a svg using plantServerUml
   */
  async function toImage(text: string) {
    // Compress text so plantuml server can read it
    const compressed = await compress(text);

    return toSvg(compressed);
  }

  return {
    toImage
  };
}
