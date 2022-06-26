import * as React from "react";
import { config } from "../config";
import Axios from "axios";
import { DiagramDTO } from "plantuml-proxy-shared/dtos/diagram";
import { Link } from "react-router-dom";
import { JwtFromLocalStorage } from "uml-jwt";

interface Props {
  diagramId?: string;
}

interface State {
  /**
   * Svg of diagram
   */
  svg: string;

  /**
   * Error
   */
  error: string | null;
}

function httpHeadersForRequest(jwt: string | null) {
  return jwt ? { Authorization: "bearer " + jwt } : {};
}

export class PublicView extends React.Component<Props, State> {
  state = {
    svg: "",
    error: null
  };

  componentDidMount() {
    this.fetchCurrentDiagramUml();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.diagramId === prevProps.diagramId) {
      return;
    }

    this.fetchCurrentDiagramUml();
  }

  fetchCurrentDiagramUml = async () => {
    if (this.props.diagramId == null) {
      return this.setState({
        svg: "",
        error: "No diagram id provided"
      });
    }

    const jwt = JwtFromLocalStorage();

    try {
      const resp = await Axios.get(
        config.api.url + "/diagrams/" + this.props.diagramId + "/render",
        {
          headers: httpHeadersForRequest(jwt)
        }
      );
      this.setState({ svg: resp.data, error: "" });
    } catch (e) {
      this.setState({ error: "" });
    }
  };

  closeErrorHandler = () => this.setState({ error: "" });

  render() {
    return (
      <div className="container">
        {this.state.error && (
          <div className="alert alert-danger" role="alert">
            {this.state.error}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={this.closeErrorHandler}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        <div className="row text-center">
          <div
            className="col-sm"
            dangerouslySetInnerHTML={{ __html: this.state.svg }}
          ></div>
        </div>
      </div>
    );
  }
}
