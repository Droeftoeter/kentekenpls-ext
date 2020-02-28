import { useReducer, useEffect } from 'react';

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
    const category = state.stack.slice(-1).shift();

    switch (type) {
        case 'select-next':
            if (state.activeChild < category.items.length) {
                return {
                    ...state,
                    activeChild: state.activeChild + 1,
                };
            }

            return state;

        case 'select-previous':
            if (state.activeChild > 0) {
                return {
                    ...state,
                    activeChild: state.activeChild - 1,
                };
            }

            return state;

        case 'enter-selected':
            if (!category.items[ state.activeChild ] || !category.items[ state.activeChild ].items) {
                return state;
            }

            return {
                ...state,
                stack: [
                    ...state.stack,
                    category.items[ state.activeChild ],
                ],
                selectionStack: [
                    ...state.selectionStack,
                    state.activeChild,
                ],
                activeChild: 0,
            };

        case 'push':
            return {
                ...state,
                stack: [
                    ...state.stack,
                    payload,
                ],
                selectionStack: [
                    ...state.selectionStack,
                    state.activeChild,
                ],
                activeChild: 0,
            };

        case 'pop':
            if (state.stack.length <= 1) {
                return state;
            }

            const nextStack = [ ...state.stack ];
            const nextSelectionStack = [ ...state.selectionStack ];

            nextStack.pop();
            const lastActiveChild = nextSelectionStack.pop();

            return {
                ...state,
                stack:          nextStack,
                selectionStack: nextSelectionStack,
                activeChild:    lastActiveChild,
            };
        default:
            return state;
    }
}

/**
 * @param root
 *
 * @returns {{pop: (function(): void), stack: ([*]|*[]), activeChild: number, push: (function(*=): void)}}
 */
export default function useNavigationStack(root) {
    const [ state, dispatch ] = useReducer(
        reducer,
        {
            stack:          [ root ],
            selectionStack: [],
            activeChild:    0,
        },
    );

    const push = category => dispatch({ type: 'push', payload: category });
    const pop = () => dispatch({ type: 'pop' });

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
                    dispatch({ type: 'enter-selected' });
                    event.preventDefault();
                }

                if (shortKeys.leaveCategory.includes(event.key)) {
                    dispatch({ type: 'pop' });
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

    return { stack: state.stack, activeChild: state.activeChild, push, pop };
}