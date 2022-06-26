import { JwtFromLocalStorage, JwtHasExpired, JwtDecodePayload } from "uml-jwt";
import { EventEnum } from "uml-event-bus";
import { emit } from "front-components";
import Axios from "axios";
import {
  DiagramDTO,
  DiagramCreateDTO,
} from "plantuml-proxy-shared/dtos/diagram";
import { config } from "../config";

function isJwtValid(jwt: string | null) {
  if (!jwt) {
    return false;
  }

  // Check expiracy
  const payload = JwtDecodePayload(jwt);
  if (!payload || JwtHasExpired(payload)) {
    return false;
  }

  return true;
}

export async function fetchDiagramsList(): Promise<DiagramDTO[]> {
  const jwt = JwtFromLocalStorage();
  if (!isJwtValid(jwt)) {
    return [];
  }

  try {
    const resp = await Axios.get<DiagramDTO[]>(config.api.url + "/diagrams", {
      headers: { Authorization: "bearer " + jwt },
    });

    return resp.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function fetchDiagramById(diagramId: string): Promise<DiagramDTO> {
  const jwt = JwtFromLocalStorage();
  if (!isJwtValid(jwt)) {
    emit(EventEnum.NEED_AUTHENTIFICATION);
    throw new Error("You need to be logged in");
  }

  const resp = await Axios.get<DiagramDTO>(
    config.api.url + "/diagrams/" + diagramId,
    {
      headers: { Authorization: "bearer " + jwt },
    }
  );
  return resp.data;
}

export async function createDiagram(
  title: string,
  text: string
): Promise<DiagramDTO> {
  const jwt = JwtFromLocalStorage();
  if (!isJwtValid(jwt)) {
    emit(EventEnum.NEED_AUTHENTIFICATION);
    throw new Error("You need to be logged in");
  }

  const dto: DiagramCreateDTO = {
    title,
    data: text,
  };

  const resp = await Axios.post<DiagramDTO>(config.api.url + "/diagrams", dto, {
    headers: { Authorization: "bearer " + jwt },
  });

  return resp.data;
}

export async function updateDiagram(
  diagramId: string,
  title: string,
  text: string
): Promise<DiagramDTO> {
  const jwt = JwtFromLocalStorage();
  if (!isJwtValid(jwt)) {
    emit(EventEnum.NEED_AUTHENTIFICATION);
    throw new Error("You need to be logged in");
  }

  const dto: DiagramCreateDTO = {
    title,
    data: text,
  };

  const resp = await Axios.put<DiagramDTO>(
    config.api.url + "/diagrams/" + diagramId,
    dto,
    {
      headers: { Authorization: "bearer " + jwt },
    }
  );

  return resp.data;
}

let timeoutHandler: number;
type renderDiagramCb = (
  error: { message: string; line: number } | null,
  svg: string
) => void;

export async function renderDiagramSvg(text: string, cb: renderDiagramCb) {
  if (timeoutHandler) {
    clearTimeout(timeoutHandler);
  }

  timeoutHandler = setTimeout(async () => {
    try {
      const svg = await fetchDiagramSvg(text);
      cb(null, svg);
    } catch (e) {
      const error = e.response
        ? { message: e.response.data.message, line: e.response.data.line }
        : { message: e.message, line: 0 };
      cb(error, "");
    }
  }, 500);
}

async function fetchDiagramSvg(text: string) {
  const jwt = JwtFromLocalStorage();

  const headers = jwt ? { Authorization: "bearer " + jwt } : {};

  const resp = await Axios.post(
    config.api.url + "/public/render",
    { data: text },
    {
      headers,
    }
  );

  return resp.data;
}
