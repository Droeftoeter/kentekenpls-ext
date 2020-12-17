import { useReducer, useEffect } from 'react';

import { Category } from '../../common/types';

type State = {
    stack:          Category[]
    selectionStack: number[]
    activeChild:    number
};

type Action =
    | { type: 'select-next' }
    | { type: 'select-previous' }
    | { type: 'enter-selected' }
    | { type: 'push', payload: Category }
    | { type: 'pop' };

const shortKeys = {
    nextItem:      [ 'ArrowDown', 'k' ],
    previousItem:  [ 'ArrowUp', 'j' ],
    enterCategory: [ 'ArrowRight', ' ', 'Enter' ],
    leaveCategory: [ 'ArrowLeft', 'Backspace' ],
};

function reducer(state: State, action: Action): State {
    const category = state.stack.slice(-1).shift();

    switch (action.type) {
        case 'select-next':
            if (category && state.activeChild < category.items.length) {
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
            if (!category || !category.items[ state.activeChild ]) {
                return state;
            }

            const activeChild = category.items[ state.activeChild ];

            if ('items' in activeChild) {
                return {
                    ...state,
                    stack: [
                        ...state.stack,
                        activeChild,
                    ],
                    selectionStack: [
                        ...state.selectionStack,
                        state.activeChild,
                    ],
                    activeChild: 0,
                };
            }

            return state;

        case 'push':
            return {
                ...state,
                stack: [
                    ...state.stack,
                    action.payload,
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
                activeChild:    lastActiveChild ?? 0,
            };

        default:
            return state;
    }
}

export default function useNavigationStack(root: Category) {
    const [ state, dispatch ] = useReducer(
        reducer,
        {
            stack:          [ root ],
            selectionStack: [],
            activeChild:    0,
        },
    );

    const push = (category: Category) => dispatch({ type: 'push', payload: category });
    const pop = () => dispatch({ type: 'pop' });

    /**
     * Deal with keyboard-based navigation
     */
    useEffect(
        () => {
            const handleShortcut = (event: KeyboardEvent) => {
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
