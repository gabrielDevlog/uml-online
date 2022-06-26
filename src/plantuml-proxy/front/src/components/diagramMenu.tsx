import * as React from "react";
import { DiagramDTO } from "plantuml-proxy-shared/dtos/diagram";

export interface Props {
  diagramsList: DiagramDTO[];
  selectedId: string | null;
  onDiagramSelected: (diagramId: string) => void;
}

export function DiagramMenu(props: Props) {
  function handleDiagramSelected(event: any) {
    if (!event.target || event.target.value == null) {
      return;
    }

    props.onDiagramSelected(event.target.value);
  }

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          Go to
        </label>
      </div>
      <select
        className="custom-select"
        id="inputGroupSelect01"
        onChange={handleDiagramSelected}
        value={props.selectedId || ""}
      >
        <option key="new" value="">
          (new diagram)
        </option>
        {props.diagramsList.map(diagram => (
          <option key={diagram.id} value={diagram.id}>
            {diagram.title}
          </option>
        ))}
      </select>
    </div>
  );
}
