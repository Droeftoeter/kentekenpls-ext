import { RdwOpenDataVehicle } from '../common/types';
import findMatchingVehicle from './findMatchingVehicle';

function createMenu(): void {
    chrome.commands.getAll(
        commands => {
            const shortCut = commands.find(c => c.name === 'kenteken-pls');

            chrome.contextMenus.create({
                id:       'kenteken-pls',
                title:    `Kenteken invoegen ${ shortCut && shortCut.shortcut ? `(${ shortCut.shortcut })` : '' }`.trim(),
                contexts: ['editable'],
            });
        }
    );
}

function inject(): void {
    chrome.tabs.executeScript({
        file: 'dist/app/index.js',
    });
}

type ChromeMessage =
    | { action: 'fetch-vehicle', payload: { id: string, where: string } }
    | any;

chrome.runtime.onMessage.addListener(
    (message: ChromeMessage, _, callback: (result: { resolved?: RdwOpenDataVehicle, error?: string }) => void) => {

        if (message.action === 'fetch-vehicle') {
            const { id, where } = message.payload;

            findMatchingVehicle(id, where)
                .then(vehicle => callback({ resolved: vehicle }))
                .catch(error => callback({ error: error.toString() }));

            return true;
        }
    },
);

chrome.commands.onCommand.addListener(
    name => {
        if (name === 'kenteken-pls') {
            inject();
        }
    }
);

chrome.contextMenus.onClicked.addListener(
    ({ menuItemId }) => {
        if (menuItemId === 'kenteken-pls') {
            inject();
        }
    }
);

chrome.runtime.onInstalled.addListener(
    () => {
        createMenu();
    }
);
