import * as React from "react";
import axios from "axios";
import { JwtFromLocalStorage } from "uml-jwt";
import { ResourceDTO } from "account-shared/dtos/resource";
import { config } from "../config";
import { ShareResource } from "./ShareResource";
import { Link } from "react-router-dom";
import { ResourceVisibility } from "account-shared/dtos/resource-visibility.enum";

interface Props {
  diagramId: string;
}

interface State {
  resourceId: string | null;
  visibility: ResourceVisibility | null;
}

export class Resource extends React.Component<Props, State> {
  state = {
    resourceId: null,
    visibility: null
  };

  componentDidMount() {
    this.getResource();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.diagramId === prevProps.diagramId) {
      return;
    }

    this.getResource();
  }

  getResource = async () => {
    const jwt = JwtFromLocalStorage();

    const url =
      config.api.url +
      "/resources?UMLResourceURI=/diagrams/" +
      this.props.diagramId;

    try {
      const resp = await axios.get<ResourceDTO[]>(url, {
        headers: { Authorization: "bearer " + jwt }
      });
      this.setState({
        resourceId: resp.data[0].id,
        visibility: resp.data[0].visibility
      });
    } catch (e) {
      this.setState({ resourceId: null, visibility: null });
    }
  };

  render() {
    if (!this.state.resourceId) {
      return (
        <div className="container-fluid mt-2 text-right">
          <ShareResource diagramId={this.props.diagramId} />
        </div>
      );
    }

    if (this.state.visibility !== ResourceVisibility.Public) {
      return <div className="container-fluid mt-2 text-right">Private</div>;
    }

    return (
      <div className="container-fluid mt-2 text-right">
        Public diagram:{" "}
        <Link to={"/public/diagrams/" + this.props.diagramId}>
          go to public url
        </Link>
      </div>
    );
  }
}
