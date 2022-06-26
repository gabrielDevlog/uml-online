import "uml-style";
import { redirectIfNotAuthenticated } from "./portal-logic/authenticated";
import { handleEvents } from "./events/event-handling";
import { registerNavLinks } from "./ux/handleLinks";
import { goToDiagramsAsHomepage } from "./portal-logic/homepage";
import * as serviceBootstraper from "./services/serviceBootstraper";

import MicroModal from "micromodal";
import { config } from "./config";
import { registerButtonsClicks } from "./ux/handleButtons";
import { toggleNavbar } from "./ux/handleNavbar";
MicroModal.init();

registerNavLinks();
registerButtonsClicks();

// 1. use diagrams as homepage
goToDiagramsAsHomepage();

// 2. go to login if not authenticated
redirectIfNotAuthenticated();

// Handle events => act on routing
toggleNavbar();
handleEvents();

// Register frontend services
serviceBootstraper.registerUncontrolledService(config.services.plantumlProxy);
serviceBootstraper.registerUncontrolledService(config.services.account);
