import React from 'react';
import styled from 'styled-components';

import { SadCat } from '../emoji';
import Header from './Header';

type ErrorProps = JSX.IntrinsicElements["div"] & {
    onClose: () => void
};

const Error = ({ className, children, onClose }: ErrorProps) => (
    <>
        <Header
            onCancel={ onClose }
        />
        <div
            className={ className }
        >
            <SadCat />
            <h1>Oeps! Foutje!</h1>
            <p>
                { children }
            </p>
        </div>
    </>
);

export default styled(Error)`
    background:    ${ props => props.theme.surfaceColor };
    border-radius: .25rem;
    margin:        auto;
    box-shadow:    0 0 0.125rem hsla(0, 0%, 0%, 0.12),
                   0 0.125rem 0.25rem hsla(0, 0%, 0%, 0.24);

    display:        flex;
    flex-direction: column;

    h1 {
        font-size: 1.25rem;
        padding:   0 2rem;
        text-align: center;
        color:     ${ props => props.theme.textColor };
    }

    p {
        padding:          1rem 2rem;
        background-color: ${ props => props.theme.focusColor };
        color:            ${ props => props.theme.subtleTextColor };
        white-space:      pre-wrap;
        margin:           0;
        line-height:      1.25em;
        font-style:       italic;
    }

    & > svg:first-child {
        width:  6rem;
        height: auto;
        margin: 2rem auto;
    }
`;
