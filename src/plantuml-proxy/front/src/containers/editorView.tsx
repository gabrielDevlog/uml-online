import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { DiagramMenu } from "../components/diagramMenu";
import {
  fetchDiagramsList,
  fetchDiagramById,
  createDiagram,
  updateDiagram,
  renderDiagramSvg,
} from "../logic/api";
import { DiagramDTO } from "plantuml-proxy-shared/dtos/diagram";
import { DiagramHeader } from "../components/diagramHeader";
import { CodeMirrorEditor } from "../components/CodeMirrorEditor";
import { DiagramSvg } from "../components/diagramSvg";
import { DiagramAlert } from "../components/diagramAlert";
import activityDiagram from "../resources/example-activity.json";
import sequenceDiagram from "../resources/example-sequence.json";
import classDiagram from "../resources/example-class.json";
import componentDiagram from "../resources/example-component.json";

interface Props {
  exampleId?: string | null;
}

interface State {
  diagramsList: DiagramDTO[];
  diagram: {
    id: string | null;
    title: string;
    text: string;
    isSaved: boolean;
  };
  svg: {
    svg: string;
  };
  error: {
    message: string;
    line: number;
  } | null;
  hoveredEntity: {
    type: string;
    name: string;
    lineNumber: number | null;
  } | null;
}

export function EditorView(props: Props) {
  const [state, setState] = useState<State>({
    diagramsList: [],
    diagram: { id: null, title: "", text: "", isSaved: true },
    svg: { svg: "" },
    error: null,
    hoveredEntity: null,
  });

  const params = useParams<{ id: string }>();
  const location = useLocation();
  const history = useHistory();

  function handleDiagramSelected(diagramId: string) {
    if (diagramId === "") {
      // New diagram
      history.push("/diagrams");
    } else {
      history.push("/diagrams/" + diagramId);
    }
  }

  async function handleDiagramSaved() {
    try {
      if (params.id) {
        await updateDiagram(params.id, state.diagram.title, state.diagram.text);
        return setState({
          ...state,
          diagram: { ...state.diagram, isSaved: true },
        });
      }

      const newDiagram = await createDiagram(
        state.diagram.title,
        state.diagram.text
      );
      setState({
        ...state,
        diagramsList: [
          ...state.diagramsList,
          {
            id: newDiagram.id,
            title: state.diagram.title,
            data: state.diagram.text,
          },
        ],
        diagram: { ...state.diagram, id: newDiagram.id, isSaved: true },
      });

      history.push("/diagrams/" + newDiagram.id);
    } catch (err) {
      setState({ ...state, error: { message: err.message, line: 0 } });
    }
  }

  async function handleDiagramTitleChange(title: string) {
    setState((prevState) => ({
      ...prevState,
      diagram: { ...prevState.diagram, title, isSaved: false },
    }));
  }

  async function handleDiagramTextChange(text: string) {
    setState((prevState) => ({
      ...prevState,
      diagram: { ...prevState.diagram, text, isSaved: false },
    }));

    renderDiagramSvg(text, (error: any, svg: string) => {
      setState((prevState) => ({ ...prevState, svg: { svg }, error }));
    });
  }

  function handleSvgEntityOvered(type: string, name: string) {
    const index = state.diagram.text.indexOf(name);
    const subText = state.diagram.text.substring(0, index);
    const lineNumber = subText.split("\n").length;
    setState({
      ...state,
      hoveredEntity: {
        type,
        name,
        lineNumber,
      },
    });
  }

  useEffect(() => {
    fetchDiagramsList()
      .then((diagramsList) =>
        setState((prevState) => ({ ...prevState, diagramsList }))
      )
      .catch((err) =>
        setState((prevState) => ({
          ...prevState,
          error: { message: err.message, line: 0 },
        }))
      );
  }, []);

  // ComponentDidMount
  useEffect(() => {
    // No diagram to fetch, we can give example if needed
    if (!params.id) {
      const params = new URLSearchParams(location.search);
      const exampleId = params.get("example");

      let text = "";
      switch (exampleId) {
        case "activity":
          text = activityDiagram.text;
          break;
        case "sequence":
          text = sequenceDiagram.text;
          break;
        case "component":
          text = componentDiagram.text;
          break;
        case "class":
          text = classDiagram.text;
          break;
      }

      setState((prevState) => ({
        ...prevState,
        diagram: {
          id: null,
          title: "",
          text,
          isSaved: true,
        },
        svg: {
          svg: "",
          error: null,
        },
      }));

      // first render if an example is provided
      if (text !== "") {
        renderDiagramSvg(text, (error: any, svg: string) => {
          setState((prevState) => ({ ...prevState, svg: { svg }, error }));
        });
      }
      return;
    }

    fetchDiagramById(params.id)
      .then((fetchedDiagram) => {
        setState((prevState) => ({
          ...prevState,
          diagram: {
            id: fetchedDiagram.id,
            title: fetchedDiagram.title,
            text: fetchedDiagram.data,
            isSaved: true,
          },
        }));

        renderDiagramSvg(fetchedDiagram.data, (error: any, svg: string) => {
          setState((prevState) => ({ ...prevState, svg: { svg }, error }));
        });
      })
      .catch((err) =>
        setState((prevState) => ({
          ...prevState,
          error: { message: err.message, line: 0 },
        }))
      );
  }, [params.id, location.search]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm">
          <DiagramAlert error={state.error} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <DiagramHeader
            title={state.diagram.title}
            onTitleChange={handleDiagramTitleChange}
            canSave={state.diagram.isSaved}
            onSave={handleDiagramSaved}
          />
        </div>
        <div className="col-sm">
          <DiagramMenu
            diagramsList={state.diagramsList}
            selectedId={state.diagram.id}
            onDiagramSelected={handleDiagramSelected}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-sm">
          <CodeMirrorEditor
            text={state.diagram.text}
            onTextChange={handleDiagramTextChange}
            errorLine={state.error && state.error.line}
            hoveredLine={state.hoveredEntity && state.hoveredEntity.lineNumber}
          />
        </div>
        <div className="col-sm">
          <DiagramSvg
            svg={state.svg.svg}
            onSvgEntityHovered={handleSvgEntityOvered}
          />
        </div>
      </div>
    </div>
  );
}
