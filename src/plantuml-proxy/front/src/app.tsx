import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PublicView } from "./containers/publicView";
import { EditorView } from "./containers/editorView";

export default function App() {
  const routes = (
    <Switch>
      <Route path="/diagrams/:id">
        <EditorView />
      </Route>
      <Route
        path="/public/diagrams/:id"
        render={({ match }) => <PublicView diagramId={match.params.id} />}
      />
      <Route path="/diagrams">
        <EditorView />
      </Route>
    </Switch>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
}
