import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';

import { Blanket } from './atoms';
import { Selector } from './organisms';

/**
 * Application root
 * Passing the styleContainer fixes styling issues while being rendered inside of a shadow-root.
 * 
 * @param {Element}  styleContainer
 * @param {Function} onVehicle
 * @param {Function} onCancel
 */
const App = ({ styleContainer, onVehicle, onCancel }) => {
    return (
        <StyleSheetManager
            target={ styleContainer }
        >
            <Blanket>
                <Selector
                    onVehicle={ onVehicle }
                    onCancel={ onCancel }
                />
            </Blanket>
        </StyleSheetManager>
    );
};

App.propTypes = {
    onVehicle:      PropTypes.func.isRequired,
    onCancel:       PropTypes.func.isRequired,
    styleContainer: PropTypes.instanceOf(Element).isRequired,
};

export default App;