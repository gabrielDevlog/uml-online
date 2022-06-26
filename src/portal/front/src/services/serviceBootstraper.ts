/**
 * Service bootstrap is a small wrapper around single-spa library
 * So it's easier to integrate in this portal
 */

import * as singleSpa from "single-spa";
import { RemoteService } from "../config";
import { createSingleSpaConfig } from "./createSingleSpaConfig";
import { createMemoryHistory } from "history";
import { instantiateAt, unmountFrom } from "front-components";
import { getModule } from "./store";

// Start singleSpa
singleSpa.start();

/**
 * Return true if current location begin given paths
 * @deprecated
 */
const activateForPath = (basePaths: string[]) => (location: any) =>
  basePaths.some((basePath) => location.pathname.startsWith(basePath));

/**
 * Launch a service on given div
 * return this service so we can call some functions on it
 * @deprecated
 */
export async function mountControlledService(
  service: RemoteService,
  divId: string
) {
  const domElement = document.getElementById(divId);
  if (!domElement) {
    throw new Error("Container div not found");
  }

  // Create a memory router, so we can control this service using via router
  const serviceRouter = createMemoryHistory();

  const singleSpaConfig = createSingleSpaConfig(
    service,
    domElement,
    serviceRouter,
    {}
  );

  // Add some props to config object, probably a bug in .d.ts file
  const mountRootParcelConfig = {
    ...singleSpaConfig,
    domElement,
    customProps: {},
  };

  const parcel = singleSpa.mountRootParcel(mountRootParcelConfig, {
    domElement,
  });

  instantiateAt("uml-account", domElement);

  // Return a hook on service router & event bus once service is mounted
  return parcel.mountPromise.then(() => ({
    serviceRouter,
    serviceEventBus: {},
  }));
}

/**
 * Register a service using its config
 * Service will be activated on given paths
 * @param service
 */
export async function registerUncontrolledService(service: RemoteService) {
  const domElement = document.getElementById(service.app_unique_name);
  if (!domElement) {
    throw new Error("DomElement not found");
  }

  // Load js files of remove service, a service register itself once loaded
  await getModule(service);

  return instantiateAt(service.serviceId, domElement);
}

/**
 * Register a service using its config
 * Service is controlled: portal can use its router & its event bus
 */
export async function registercontrolledService(
  service: RemoteService,
  domElement: HTMLElement
) {
  // Load js files of remove service, a service register itself once loaded
  await getModule(service);
  return instantiateAt(service.serviceId, domElement, { isControlled: true });
}

export function unmountService(
  service: RemoteService,
  domElement: HTMLElement
) {
  return unmountFrom(service.serviceId, domElement);
}
