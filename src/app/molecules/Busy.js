import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Circular } from '@vcnkit/progress';

import { PersonWithFoldingHands } from '../atoms';

const Busy = ({ className, children }) => (
    <div
        className={ className }
    >
        <div>
            <Circular width={ 52 }/>
            <PersonWithFoldingHands />
        </div>
        { children }
    </div>
);

export default styled(Busy)`
    background:    #FFFFFF;
    border-radius: .25rem;
    margin:        auto;
    padding:       1rem 2rem 1rem 1rem;

    display:        flex;
    flex-direction: row;
    align-items:    center;

    & > div:first-child {
        position: relative;
        margin:   0 1rem -.5rem 0;

        & > svg:first-child {
            stroke: #FCC21B;
            circle {
                stroke: #FCC21B;
            }
        }

        & > svg:last-child {
            position: absolute;
            width:    1.5rem;
            height:   auto;
            top:      .75rem;
            left:     .9rem;
        }
    }
`;