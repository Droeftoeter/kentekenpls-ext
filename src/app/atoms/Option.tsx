import React from 'react';
import styled from 'styled-components';

type OptionProps = JSX.IntrinsicElements["a"] & {
    icon:   React.ReactNode
    active: boolean
};

const Option = ({ className, children, icon, active, ...rest }: OptionProps) => (
    <a
        className={ className }
        tabIndex={ 1 }
        { ...rest }
    >
        { children }
        { icon }
    </a>
);

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
