import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconButton = ({ className, onClick, children, ...rest }) => (
    <a
        className={ className }
        role="button"
        onClick={ onClick }
        tabIndex={ 1 }
        { ...rest }
    >
        { children }
    </a>
);

IconButton.propTypes = {
    className: PropTypes.string,
    onClick:   PropTypes.func,
    children:  PropTypes.node.isRequired,
};

export default styled(IconButton)`
    height: 2rem;
    width:  2rem;
    cursor: pointer;

    border-radius: 1rem;

    svg {
        fill:   hsla(0, 0%, 0%, .47);
        height: auto;
        width:  1.25rem;
        margin: .375rem;
    }

    &:first-child {
        margin-left: -.375rem;
    }

    &:last-child:not(:only-child) {
        margin-right: -.375rem;
    }

    &:hover, &:focus {
        background: hsla(0, 0%, 0%, .08);
        outline:    none;   
    }
`;