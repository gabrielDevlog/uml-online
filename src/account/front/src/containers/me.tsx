import * as React from "react";
import { JwtPayloadFromLocalStorage, JwtPayload } from "uml-jwt";
import { User } from "../components/User";

interface State {
  jwt: JwtPayload | null;
}

export class Me extends React.Component<{}, State> {
  state: State = {
    jwt: null,
  };

  componentDidMount() {
    const jwt = JwtPayloadFromLocalStorage();
    this.setState({ jwt });
  }

  render() {
    return this.state.jwt ? <User email={this.state.jwt.email} /> : null;
  }
}
