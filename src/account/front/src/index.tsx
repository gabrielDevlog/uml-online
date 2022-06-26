import * as React from "react";
import * as ReactDOM from "react-dom";
import "uml-style";

import { App } from "./app";

import { registerInstance } from "front-components";
import { getReactRouterHistory } from "front-components-history";

// Register this service to global store
registerInstance({
  serviceId: "uml-account",
  mount,
  unmount,
});

// All frontend services should implement a similar function
export function mount(div: HTMLElement) {
  const history = getReactRouterHistory();

  ReactDOM.render(<App history={history} />, div);
  return Promise.resolve();
}

export function unmount(div: HTMLElement) {
  ReactDOM.unmountComponentAtNode(div);
  return Promise.resolve();
}
