import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';

import { Blanket } from './atoms';
import { Error } from './molecules';
import { Selector } from './organisms';

/**
 * Check if the element is INPUT or TEXTAREA
 *
 * @param {Element} element 
 */
function isValidTag (element) {
    return ['INPUT', 'TEXTAREA'].includes(element.tagName.toUpperCase());
}

/**
 * Gets the element's position
 * 
 * @param {Element} element 
 */
function getTargetElementPosition (element) {
    const { top, height, left } = element.getBoundingClientRect();

    return {
        left,
        top: top + height,
    };
}

/**
 * Application root
 * Passing the styleContainer fixes styling issues while being rendered inside of a shadow-root.
 * 
 * @param {Element}  styleContainer
 * @param {Element}  targetElement
 * @param {Function} onVehicle
 * @param {Function} onCancel
 */
const App = ({ styleContainer, targetElement, onVehicle, onCancel }) => (
    <StyleSheetManager
        target={ styleContainer }
    >
        { isValidTag(targetElement) ? (
            <Selector
                onVehicle={ onVehicle }
                onCancel={ onCancel }
                { ...getTargetElementPosition(targetElement) }
            />
        ) : (
            <Blanket>
                <Error
                    onClose={ onCancel }
                >
                    Kenteken, pls werkt helaas nog niet voor het huidige element.
                </Error>
            </Blanket>
        ) }
    </StyleSheetManager>
);

App.propTypes = {
    onVehicle:      PropTypes.func.isRequired,
    onCancel:       PropTypes.func.isRequired,
    targetElement:  PropTypes.instanceOf(Element).isRequired,
    styleContainer: PropTypes.instanceOf(Element).isRequired,
};

export default App;