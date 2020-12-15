import React from 'react';
import styled from 'styled-components';

import { PersonWithFoldingHands } from '../emoji';
import { IconButton, Loader } from '../atoms';
import * as Icons from '../icons';

type HeaderProps = JSX.IntrinsicElements["header"] & {
    loading?:  boolean
    onBack?:   () => void
    onCancel?: () => void
};

const Header = ({ className, children, loading, onBack, onCancel }: HeaderProps) => (
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

    display:        flex;
    flex-direction: row;
    align-items:    center;

    & > svg {
        width:  2rem;
        height: auto;
    }

    & > span {
        margin: .125rem 1rem 0;
    }

    &:not(:only-child) {
        border-bottom: .0625rem solid hsla(0, 0%, 0%, .06);
    }

    ${ IconButton }:last-child {
        margin-left: auto;
    }
`;
