import { goTo } from "../router/main-router";

/**
 * Redirect / to diagrams
 */
export function goToDiagramsAsHomepage() {
  const homePaths = [/^\/home$/, /^\/$/];

  const onHomePage = homePaths.some((url) => {
    return window.location.pathname.match(url);
  });

  if (onHomePage) {
    goTo("/diagrams");
  }
}
