import * as Koa from "koa";
import { proxyToServices } from "./proxyToServices";
import { authWithAccountService } from "./auth";

const app = new Koa();

// All requests to -api should pass authentification control
// Excepts requests to /public routes
app.use(async (ctx, next) => {
  const pathNeedingAuth = /-api(?!\/public)/;
  if (pathNeedingAuth.test(ctx.request.url)) {
    await authWithAccountService(ctx);
  }
  /// FOR LOCAL DEV
  if (ctx.request.method !== "OPTIONS" && !/public/.test(ctx.request.url)) {
    await authWithAccountService(ctx);
  }
  /////
  return next();
});

// Proxying to different microservices
app.use(proxyToServices);

app.listen(3000, () => console.log("LISTENING ON PORT 3000"));
