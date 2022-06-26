import * as React from "react";

import { Router, Switch, Route } from "react-router-dom";
import { History } from "history";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import { Resource } from "./components/Resource";
import { Me } from "./containers/me";

interface Props {
  history: History<History.PoorMansUnknown>;
}

export function App(props: Props) {
  const routes = (
    <Switch>
      <Route path="/me">
        <Me />
      </Route>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/signup">
        <SignupForm />
      </Route>
      <Route
        path="/diagrams/:id"
        render={({ match }) => <Resource diagramId={match.params.id} />}
      />
    </Switch>
  );

  return <Router history={props.history}>{routes}</Router>;
}
