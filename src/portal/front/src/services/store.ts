declare const System: any;
require("systemjs/dist/system");

import { RemoteService } from "../config";

/////
(window as any).UMLServiceStore = new Map<string, any>();
//////

// Store js module of different services by name
const moduleStore = (window as any).UMLServiceStore;

/**
 * Get a bundle of an app
 * If not present, will load it & store id
 * @param serviceConfig
 */
export async function getModule(serviceConfig: RemoteService): Promise<any> {
  const module = moduleStore.get(serviceConfig.app_unique_name);
  if (module) {
    return module;
  }

  return loadModule(serviceConfig);
}

/**
 * Load a bundle of a given service and store it
 * @return loaded bundle
 */
async function loadModule(serviceConfig: RemoteService): Promise<any> {
  const bundle = await (window as any).System.import(serviceConfig.url);
  moduleStore.set(serviceConfig.app_unique_name, bundle);
  return bundle;
}
