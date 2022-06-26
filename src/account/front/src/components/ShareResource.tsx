import * as React from "react";
import { JwtFromLocalStorage } from "uml-jwt";
import axios from "axios";
import { ResourceCreateDTO } from "account-shared/dtos/resource";
import { config } from "../config";
import { ResourceVisibility } from "account-shared/dtos/resource-visibility.enum";

interface Props {
  diagramId: string;
}

export class ShareResource extends React.Component<Props> {
  createShare = () => {
    const dto: ResourceCreateDTO = {
      resourceURI: "/diagrams/" + this.props.diagramId,
      visibility: ResourceVisibility.Public
    };

    const jwt = JwtFromLocalStorage();

    return axios.post(config.api.url + "/resources", dto, {
      headers: { Authorization: "bearer " + jwt }
    });
  };

  render() {
    return (
      <div>
        <button className="btn btn-success" onClick={this.createShare}>
          Share as public diagram
        </button>
      </div>
    );
  }
}
