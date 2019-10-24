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

        font-family: Tahoma, Geneva, sans-serif;
    `;

    shadowRoot.appendChild(styleContainer);
    shadowRoot.appendChild(appContainer);
    shadowRoot.appendChild(hostStyle);

    document.body.appendChild(target);

    const handleCancel = () => {
        ReactDOM.unmountComponentAtNode(appContainer);
        target.remove();

        window.__kentekenpls_active = false;
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
            targetElement={ targetElement }
            onVehicle={ handleVehicle }
            onCancel={ handleCancel }
        />,
        appContainer
    );

    retargetEvents(shadowRoot);
}

/**
 * Only have a single active instance on the page.
 */
if (!window.__kentekenpls_active) {
    window.__kentekenpls_active = true;

    injectApp(document.activeElement);
}