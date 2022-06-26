import * as Koa from "koa";
import axios from "axios";
import { config } from "./config";

/**
 * Copy Authorization header of current request
 * And sends it to account service for authentication
 * Failure in auth process are immediatly transmitted to client
 * @param ctx
 */
export async function authWithAccountService(ctx: Koa.Context) {
  try {
    const authorizationHeader = ctx.get("Authorization");
    await axios.post(
      config.services.account.url + "/pdp",
      {
        requestHost: ctx.request.hostname,
        resourceUrl: ctx.request.path,
        httpMethod: ctx.request.method
      },
      {
        headers: {
          Authorization: authorizationHeader
        }
      }
    );
    ctx.request["headers"]["x-uml-access-granted"] = "true"; // TODO: should be handle in a dedicated package
  } catch (e) {
    // Only 401 unhauthorized is retransmitted
    // Others errors are rethrowed and should be considered as 500
    if (e.response && e.response.data.statusCode === 401) {
      return ctx.throw(401, "Unauthorized");
    } else if (e.response) {
      console.error(JSON.stringify(e.response.data.message));
      return ctx.throw(500, e.response);
    } else {
      console.error(e);
      return ctx.throw(500, e);
    }
  }
}
