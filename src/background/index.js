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
 * Send a message to the content-script of the active tab if the shortcut is pressed.
 */
chrome.commands.onCommand.addListener(
    name => {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            tabs => {
                chrome.tabs.sendMessage(tabs[ 0 ].id, { id: name });
            }
        );
    }
);

/**
 * Send a message to the content-script when the menu is clicked.
 */
chrome.contextMenus.onClicked.addListener(
    ({ menuItemId }, tab) => {
        chrome.tabs.sendMessage(tab.id, { id: menuItemId });
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