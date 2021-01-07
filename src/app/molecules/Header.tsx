import React from 'react';
import styled from 'styled-components';

import { PersonWithFoldingHands } from '../emoji';
import { IconButton, Loader } from '../atoms';
import * as Icons from '../icons';

type HeaderProps = JSX.IntrinsicElements["header"] & {
    loading?:   boolean
    onBack?:    () => void
    onCancel?:  () => void
    onRefresh?: () => void
};

const Header = ({ className, children, loading, onBack, onCancel, onRefresh }: HeaderProps) => (
    <header
        className={ className }
    >
        { loading ? <Loader /> : onBack ? (
            <IconButton
                onClick={ onBack }
            >
                <Icons.ArrowBack />
            </IconButton>
        ) : <PersonWithFoldingHands /> }
        <span>{ children }</span>
        { onRefresh && (
            <IconButton
                onClick={ onRefresh }
            >
                <Icons.Refresh />
            </IconButton>
        ) }
        { onCancel && (
            <IconButton
                onClick={ onCancel }
            >
                <Icons.Close />
            </IconButton>
        ) }
    </header>
);

export default styled(Header)`
    padding: 0 1rem;

    height:        3rem;
    border-radius: .25rem .25rem 0 0;
    background:    ${ props => props.theme.surfaceColor };
    position:      relative;
    z-index:       1;

    display:        flex;
    flex-direction: row;
    align-items:    center;

    color: ${ props => props.theme.subtleTextColor };

    & > svg {
        width:  2rem;
        height: auto;
    }

    & > span {
        margin: .125rem auto 0;
    }

    &:not(:only-child) {
        border-bottom: .0625rem solid ${ props => props.theme.borderColor };
    }
`;
