import { JwtPayloadFromLocalStorage, JwtHasExpired } from "uml-jwt";
import { goTo } from "../router/main-router";

export function isAuthenticated() {
  const jwt = JwtPayloadFromLocalStorage();
  return jwt && !JwtHasExpired(jwt);
}

/**
 * A small guard, so private routes can not be reached if not authenticated
 */
function isAccessGranted() {
  const privateRoutes = [/^\/me/];

  const onPrivateRoute = privateRoutes.some((route) => {
    return window.location.pathname.match(route);
  });

  if (!onPrivateRoute) {
    return true;
  }

  return isAuthenticated();
}

/**
 * Redirect to login if trying to access a forbidden route
 */
export function redirectIfNotAuthenticated() {
  const canAccess = isAccessGranted();
  if (!canAccess) {
    goTo("/login");
  }
}
