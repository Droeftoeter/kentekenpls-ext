import browser from "webextension-polyfill";

import { BrowserMessage } from "../common/types";
import findMatchingVehicle from "./findMatchingVehicle";

async function openInCurrentTab() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  if (tab && tab.id) {
    browser.tabs.sendMessage(tab.id, { action: "open" });
  }
}

async function createMenu(): Promise<void> {
  const commands = await browser.commands.getAll();
  const shortCut = commands.find((c) => c.name === "kenteken-pls");

  browser.contextMenus.create({
    id: "kenteken-pls",
    title: `Kenteken invoegen ${
      shortCut && shortCut.shortcut ? `(${shortCut.shortcut})` : ""
    }`.trim(),
    contexts: ["editable"],
  });
}

browser.runtime.onMessage.addListener((message: BrowserMessage) => {
  if (message.action === "fetch-vehicle") {
    const { id, where } = message.payload;

    return findMatchingVehicle(id, where);
  }
});

browser.commands.onCommand.addListener((name) => {
  if (name === "kenteken-pls") {
    openInCurrentTab();
  }
});

browser.contextMenus.onClicked.addListener(({ menuItemId }) => {
  if (menuItemId === "kenteken-pls") {
    openInCurrentTab();
  }
});

browser.runtime.onInstalled.addListener(() => {
  createMenu();
});
