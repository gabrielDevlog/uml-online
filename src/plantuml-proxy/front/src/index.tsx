import "uml-style";
import "./codemirror";

import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";

import { registerInstance } from "front-components";

// Register this service to global store
registerInstance({
  serviceId: "uml-plantuml-proxy",
  mount,
  unmount,
});

// All frontend services should implement a similar function
export function mount(div: HTMLElement) {
  ReactDOM.render(<App />, div);
  return Promise.resolve();
}

export function unmount(div: HTMLElement) {
  ReactDOM.unmountComponentAtNode(div);
  return Promise.resolve();
}
