import { useReducer, useEffect } from 'react';

import categories from '../categories';

const shortKeys = {
    nextItem:      [ 'ArrowDown', 'k' ],
    previousItem:  [ 'ArrowUp', 'j' ],
    enterCategory: [ 'ArrowRight', ' ', 'Enter' ],
    leaveCategory: [ 'ArrowLeft', 'Backspace' ],
};

/**
 * Reducer
 * 
 * @param {Object} state 
 * @param {String} type 
 * @param {*}      payload
 */
function reducer(state, { type, payload }) {
    const maxIndex = state.level === 0
        ? categories.length - 1
        : state.category.items.length - 1;

    const activeKey = state.level === 0
        ? 'activeRoot'
        : 'activeChild';

    switch (type) {
        case 'select-next':
            if (state[ activeKey ] < maxIndex) {
                return {
                    ...state,
                    [ activeKey ]: state[ activeKey ] + 1,
                };
            }

            return state;
        case 'select-previous':
            if (state[ activeKey ] > 0) {
                return {
                    ...state,
                    [ activeKey ]: state[ activeKey ] - 1,
                };
            }

            return state;

        case 'enter-category':
            if (state.category === null) {
                return {
                    ...state,
                    level:       1,
                    activeChild: 0,
                    category:    payload || categories[ state.activeRoot ],
                };
            }

            return state;
        case 'leave-category':
            if (state.category) {
                return {
                    ...state,
                    level:    0,
                    category: null,
                };
            }

            return state;
        default:
            return state;
    }
}

/**
 * Keep track of the currently selected child item
 */
export default function useSelectionState() {
    const [ state, dispatch ] = useReducer(reducer, { level: 0, activeRoot: 0, activeChild: 0, category: null });

    const enterCategory = category => dispatch({ type: 'enter-category', payload: category });
    const leaveCategory = () => dispatch({ type: 'leave-category' });

    /**
     * Deal with keyboard-based navigation
     */
    useEffect(
        () => {
            const handleShortcut = event => {
                if (shortKeys.nextItem.includes(event.key)) {
                    dispatch({ type: 'select-next' });
                    event.preventDefault();
                }
                
                if (shortKeys.previousItem.includes(event.key)) {
                    dispatch({ type: 'select-previous' });
                    event.preventDefault();
                }
                
                if (shortKeys.enterCategory.includes(event.key)) {
                    dispatch({ type: 'enter-category' });
                    event.preventDefault();
                }
                
                if (shortKeys.leaveCategory.includes(event.key)) {
                    dispatch({ type: 'leave-category' });
                    event.preventDefault();
                }
            };

            document.addEventListener('keydown', handleShortcut);

            return () => {
                document.removeEventListener('keydown', handleShortcut);
            }
        },
        [ dispatch ],
    );

    return { state, enterCategory, leaveCategory };
}