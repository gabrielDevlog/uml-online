import { isAuthenticated } from "../portal-logic/authenticated";

export function toggleNavbar() {
  const navMenuAuthenticated = document.getElementById(
    "navbarNav-authenticated-menu"
  );
  const navMenuUnauthenticated = document.getElementById(
    "navbarNav-unauthenticated-menu"
  );

  if (!navMenuAuthenticated || !navMenuUnauthenticated) {
    throw new Error("Menus not found");
  }

  if (isAuthenticated()) {
    navMenuAuthenticated.hidden = false;
    navMenuUnauthenticated.hidden = true;
  } else {
    navMenuAuthenticated.hidden = true;
    navMenuUnauthenticated.hidden = false;
  }
}
