import React from "react";
import { createRoot } from "react-dom/client";
import retargetEvents from "react-shadow-dom-retarget-events";
import browser from "webextension-polyfill";

import { ExtendedOpenDataVehicle, BrowserMessage } from "../common/types";

import App from "./App";

declare global {
  interface Window {
    __kentekenpls_remove: null | (() => void);
  }
}

window.__kentekenpls_remove = window.__kentekenpls_remove || null;

/**
 * Create a node with a shadow-root, and render the selection interface.
 *
 * @param {Element|HTMLInputElement|null} targetElement
 */
function injectApp(targetElement: Element | HTMLInputElement | null) {
  if (!targetElement) {
    return null;
  }

  const target = document.createElement("div");
  const shadowRoot = target.attachShadow({ mode: "open" });

  const styleContainer = document.createElement("div");
  const appContainer = document.createElement("div");
  const hostStyle = document.createElement("style");

  hostStyle.textContent = `
    :host {
      display: block;
      font-family: Tahoma, Geneva, sans-serif;
    }
  `;

  shadowRoot.appendChild(styleContainer);
  shadowRoot.appendChild(appContainer);
  shadowRoot.appendChild(hostStyle);

  document.body.appendChild(target);
  const root = createRoot(appContainer);

  const removeApp = () => {
    root.unmount();
    target.remove();

    window.__kentekenpls_remove = null;
  };

  const handleVehicle = (vehicle: ExtendedOpenDataVehicle) => {
    if ("value" in targetElement) {
      targetElement.value = vehicle.kenteken;
    }

    targetElement.dispatchEvent(new Event("change", { bubbles: true }));
    targetElement.dispatchEvent(new Event("blur", { bubbles: true }));
  };

  root.render(
    <App
      styleContainer={styleContainer}
      targetElement={targetElement}
      onVehicle={handleVehicle}
      onCancel={removeApp}
    />,
  );

  retargetEvents(shadowRoot);

  return removeApp;
}

browser.runtime.onMessage.addListener((message: BrowserMessage) => {
  if (message.action === "open") {
    if (typeof window.__kentekenpls_remove === "function") {
      window.__kentekenpls_remove();
    }

    window.__kentekenpls_remove = injectApp(document.activeElement);
  }
});
