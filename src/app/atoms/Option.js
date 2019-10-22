import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ArrowForward } from './';

const Option = ({ className, children, ...rest }) => (
    <a
        className={ className }
        tabIndex={ 1 }
        { ...rest }
    >
        { children }
        <ArrowForward />
    </a>
);

Option.propTypes = {
    className: PropTypes.string,
    children:  PropTypes.node.isRequired,
};

export default styled(Option)`
    text-decoration: none;
    display:         flex;
    flex-direction:  row;
    align-items:     center;
    padding:         0 1rem;
    border-radius:   .25rem;
    height:          3rem;
    cursor:          pointer;

    color: hsla(0, 0%, 0%, .67);
    fill:  hsla(0, 0%, 0%, .57);

    svg {
        height: 1rem;
        margin: 0 0 0 auto;
    }

    &:first-child {
        font-size: 1.25rem;
        color:     hsla(0, 0%, 0%, .87);
    }

    &:hover, &:focus {
        background: hsla(0, 0%, 0%, .08);
        outline:    none;
    }

    span {
        font-size:   .75rem;
        color:       hsla(0, 0%, 0%, .37);
        font-weight: 500;
        margin:      0 0 0 .5rem;
    }
`;