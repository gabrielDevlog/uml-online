import MicroModal from "micromodal";

import * as serviceBootstraper from "../services/serviceBootstraper";
import { config } from "../config";

export function registerButtonsClicks() {
  const btn = document.getElementById("modal-close-btn");
  if (!btn) {
    return;
  }

  btn.onclick = async () => {
    const domElement = document.getElementById("portal-modal-dynamic-content");
    if (domElement) {
      await serviceBootstraper.unmountService(
        config.services.account2,
        domElement
      );
    }

    MicroModal.close("modal-1");
  };
}
