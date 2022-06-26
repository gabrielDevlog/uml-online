import * as React from "react";
import { JwtRemoveFromLocalStorage } from "uml-jwt";
import { EventEnum } from "uml-event-bus";
import { emit } from "front-components";

interface Props {
  email: string;
}

export class User extends React.Component<Props> {
  signOutHandler() {
    JwtRemoveFromLocalStorage();
    emit(EventEnum.LOGOUT);
  }

  render() {
    return (
      <div>
        {this.props.email}
        <br />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.signOutHandler}
        >
          Log out
        </button>
      </div>
    );
  }
}
