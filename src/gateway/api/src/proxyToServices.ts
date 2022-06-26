import * as proxy from "http-proxy-middleware";
const c2k = require("koa-connect");
import { config } from "./config";

// This regex matches services name from url, like uml-portal in http://any.host.com/uml-portal/any
const basePathRegex = /\/([^\/.]+)/;

/**
 * Remove base path from url
 */
function removeBasePath(path: string) {
  const withoutBasePath = path.replace(basePathRegex, "");
  return withoutBasePath[0] === "/" ? withoutBasePath : "/" + withoutBasePath;
}

/**
 * Transform base path in a target host
 */
function basePathAsHost(req: any) {
  const matches = req.url.match(basePathRegex);
  return matches ? "http://" + matches[1] : "";
}

const dynamicProxy = proxy({
  logLevel: "debug",
  target: config.services.portal.url, // Default target is portal
  router: basePathAsHost, // if a service name is found, redirect request to it
  pathRewrite: removeBasePath // remove basePath from url so service sees a request to its root
});

// Proxying to different microservices
export const proxyToServices = c2k(dynamicProxy);
