import React from 'react';
import { StyleSheetManager } from 'styled-components';

import Theme from './Theme';

import { Error } from './molecules';
import { CategorizedRandomVehicleSelector } from './organisms';
import { Window } from './templates';

/**
 * Check if the element is INPUT or TEXTAREA
 *
 * @param {Element} element
 */
function isValidTag (element: Element) {
    return ['INPUT', 'TEXTAREA'].includes(element.tagName.toUpperCase());
}

/**
 * Gets the element's position
 *
 * @param {Element} element
 */
function getTargetElementPosition (element: Element): { left: number, top: number } {
    const { top, height, left } = element.getBoundingClientRect();
    const { scrollX, scrollY } = window;

    return {
        left: left + scrollX,
        top:  top + height + scrollY,
    };
}

type AppProps = {
    styleContainer: HTMLElement
    targetElement:  Element
    onVehicle:      any
    onCancel:       any
};

/**
 * Application root
 * Passing the styleContainer fixes styling issues while being rendered inside of a shadow-root.
 *
 * @param {HTMLElement} styleContainer
 * @param {Element}     targetElement
 * @param {Function}    onVehicle
 * @param {Function}    onCancel
 */
const App = ({ styleContainer, targetElement, onVehicle, onCancel }: AppProps) => (
    <StyleSheetManager
        target={ styleContainer }
    >
        <Theme>
            <Window
                { ...getTargetElementPosition(targetElement) }
            >
                { isValidTag(targetElement) ? (
                    <CategorizedRandomVehicleSelector
                        onVehicle={ onVehicle }
                        onCancel={ onCancel }
                    />
                ) : (
                    <Error
                        onClose={ onCancel }
                    >
                        Kenteken, pls werkt helaas nog niet voor het huidige element.
                    </Error>
                ) }
            </Window>
        </Theme>
    </StyleSheetManager>
);

export default App;
