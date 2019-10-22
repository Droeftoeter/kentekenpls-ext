import React from 'react';
import ReactDOM from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';

import App from './App';

/**
 * Create a node with a shadow-root, and render the selection interface.
 * 
 * @param {Element} targetElement 
 */
function injectApp(targetElement) {
    const target = document.createElement('div');
    const shadowRoot = target.attachShadow({ mode: 'open' });

    const styleContainer = document.createElement('div');
    const appContainer = document.createElement('div');
    const hostStyle = document.createElement('style');

    hostStyle.textContent = `
        :host {
            display: block;
        }
    `;

    shadowRoot.appendChild(styleContainer);
    shadowRoot.appendChild(appContainer);
    shadowRoot.appendChild(hostStyle);

    document.body.appendChild(target);

    const handleCancel = () => {
        ReactDOM.unmountComponentAtNode(appContainer);
        target.remove();

        targetElement.focus();
    };

    const handleVehicle = vehicle => {
        targetElement.value = vehicle.kenteken;

        const event = new Event('change', { bubbles: true });
        targetElement.dispatchEvent(event);

        handleCancel();
    }

    ReactDOM.render(
        <App
            styleContainer={ styleContainer }
            onVehicle={ handleVehicle }
            onCancel={ handleCancel }
        />,
        appContainer
    );

    retargetEvents(shadowRoot);
}

/**
 * Check if the element is INPUT or TEXTAREA
 *
 * @param {Element} element 
 */
function isValidTag (element) {
    return ['INPUT', 'TEXTAREA'].includes(element.tagName.toUpperCase());
}

/**
 * Wait for a signal from either the shortcut or context-menu and render the selection interface.
 */
chrome.runtime.onMessage.addListener(
    ({ id }) => {
        if (id === 'kenteken-pls' && document.activeElement && isValidTag(document.activeElement)) {
            injectApp(document.activeElement);
        }
    }
);