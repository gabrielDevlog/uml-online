import { goTo } from "../router/main-router";

const baseUrl = window.location.origin;

function createClickHandler(href: string) {
  const targetPath = href.replace(baseUrl, "");
  return function(e: any) {
    e.preventDefault();
    goTo(targetPath);
  };
}

export function registerNavLinks() {
  const rootDiv = document.getElementById("portal-navbar");

  if (!rootDiv) {
    return;
  }

  const linkTags = rootDiv.getElementsByTagName("a");

  for (let i = 0; i < linkTags.length; i++) {
    const link = linkTags[i];
    if (!link.href) {
      continue;
    }

    link.onclick = createClickHandler(link.href);
  }
}
