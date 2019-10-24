import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Option = ({ className, children, icon, active, ...rest }) => (
    <a
        className={ className }
        tabIndex={ 1 }
        { ...rest }
    >
        { children }
        { icon }
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
    height:          3rem;
    cursor:          pointer;
    
    width:      15rem;
    max-width:  15rem;
    box-sizing: border-box;

    font-size: 1rem;

    color: hsla(0, 0%, 0%, .67);
    fill:  hsla(0, 0%, 0%, .57);

    svg {
        height: .875rem;
        width:  auto;
        margin: 0 0 0 auto;
        fill:   hsla(0, 0%, 0%, .47);
    }

    &:hover, &:focus {
        background: hsla(0, 0%, 0%, .08);
        outline:    none;
    }

    ${ props => props.active ? `
        background: hsla(0, 0%, 0%, .08);
        outline:    none;        
    ` : '' }

    span {
        font-size:   .75rem;
        color:       hsla(0, 0%, 0%, .37);
        font-weight: 500;
        margin:      0 0 0 .5rem;
    }
`;