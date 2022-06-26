import { createBrowserHistory } from "history";
import { redirectIfNotAuthenticated } from "../portal-logic/authenticated";
import { goToDiagramsAsHomepage } from "../portal-logic/homepage";

const mainRouter = createBrowserHistory();

/**
 * Go to given path
 */
export function goTo(path: string) {
  mainRouter.push(path);
}

mainRouter.listen(() => {
  // 1. use diagrams as homepage
  goToDiagramsAsHomepage();

  // 2. go to login if not authenticated
  redirectIfNotAuthenticated();
});
