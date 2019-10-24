import fetchVehicle from './db';

/**
 * Creates context-menu items
 */
function createMenu() {
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
};

/**
 * Injects script into the active tab
 */
function inject() {
    chrome.tabs.executeScript({
        file: 'dist/app/index.js',
    });
}

/**
 * Wait for a vehicle request.
 */
chrome.runtime.onMessage.addListener(
    ({ action, payload = {} }, _, callback) => {
        if (action === 'fetch-vehicle') {
            const { id, where } = payload;

            const fetch = async () => {
                try {
                    await fetchVehicle(
                        id,
                        where,
                        vehicle => callback({ resolved: vehicle })
                    );
                } catch (e) {
                    callback({ error: e });
                }
            };

            fetch();

            return true;
        }
    },
);

/**
 * Inject the script when the shortcut is pressed.
 */
chrome.commands.onCommand.addListener(
    name => {
        if (name === 'kenteken-pls') {
            inject();
        }
    }
);

/**
 * Inject the script when the context-menu is clicked.
 */
chrome.contextMenus.onClicked.addListener(
    ({ menuItemId }) => {
        if (menuItemId === 'kenteken-pls') {
            inject();
        }
    }
);

/**
 * Add the context-menus on installation
 */
chrome.runtime.onInstalled.addListener(
    () => {
        createMenu();
    }
);