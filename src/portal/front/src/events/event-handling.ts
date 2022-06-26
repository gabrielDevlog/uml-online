import { EventEnum } from "uml-event-bus";
import { on } from "front-components";
import MicroModal from "micromodal";
import { goTo } from "../router/main-router";
import * as serviceBootstraper from "../services/serviceBootstraper";
import { config } from "../config";
import { toggleNavbar } from "../ux/handleNavbar";

export function handleEvents() {
  on(EventEnum.LOGOUT, () => {
    toggleNavbar();
    goTo("/login");
  });

  // Go home on login event
  on(EventEnum.LOGIN, () => {
    toggleNavbar();
    goTo("/diagrams");
  });

  // open a login modal if auth is required
  on(EventEnum.NEED_AUTHENTIFICATION, async () => {
    const domElement = document.getElementById("portal-modal-dynamic-content");
    if (!domElement) {
      return;
    }

    const serviceControls = await serviceBootstraper.registercontrolledService(
      config.services.account2,
      domElement
    );

    // Move account to /login so we display login form
    serviceControls.history.push("/login");

    serviceControls.events.on(EventEnum.LOGIN, async () => {
      await serviceBootstraper.unmountService(
        config.services.account2,
        domElement
      );
      MicroModal.close("modal-1");
      toggleNavbar();
    });

    MicroModal.show("modal-1");
  });
}
