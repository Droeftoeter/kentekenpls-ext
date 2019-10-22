import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ActionBar from '@vcnkit/core/ActionBar';
import { Primary } from '@vcnkit/core/Button';

import { SadCat } from '../atoms';

const Error = ({ className, children, onClose }) => (
    <div
        className={ className }
    >
        <SadCat />
        <h1>Er is iets niet helemaal goedgegaan...</h1>
        <p>{ children }</p>
        <ActionBar>
            <Primary
                onClick={ onClose }
            >
                Sluiten
            </Primary>
        </ActionBar>
    </div>
);

Error.propTypes = {
    className: PropTypes.string,
    children:  PropTypes.node.isRequired,
    onClose:   PropTypes.func.isRequired,
};

export default styled(Error)`
    background:    #FFFFFF;
    border-radius: .25rem;
    margin:        auto;

    display:        flex;
    flex-direction: column;

    h1 {
        font-size: 1.25rem;
        padding:   0 2rem;
    }

    p {
        padding:          1rem 2rem;
        background-color: hsla(0, 0%, 0%, .03);
        color:            hsla(0, 0%, 0%, .67);
        white-space:      pre-wrap;
        margin:           0;
    }

    & > svg:first-child {
        width:  6rem;
        height: auto;
        margin: 2rem auto;
    }
`;