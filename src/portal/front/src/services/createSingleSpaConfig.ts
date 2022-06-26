import { RemoteService } from "../config";
import { getModule } from "./store";

export function createSingleSpaConfig(
  service: RemoteService,
  defaultDomElement?: HTMLElement,
  serviceRouter?: any,
  serviceEventBus?: any
) {
  return {
    bootstrap: () => {
      return getModule(service); // Load bundle as soon as we can
    },

    mount: async () => {
      // const domEl = defaultDomElement
      //   ? defaultDomElement
      //   : document.getElementById(service.app_unique_name);
      // if (!domEl) {
      //   throw new Error("Container div not found");
      // }
      // const bundle = await getModule(service);
      // bundle.mount(domEl.id, serviceRouter, serviceEventBus);
      // return Promise.resolve();
    },

    unmount: async () => {
      const bundle = await getModule(service);
      bundle.unmount();
    }
  };
}
