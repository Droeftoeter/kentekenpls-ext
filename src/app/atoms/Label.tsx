import React from 'react';
import styled from 'styled-components';

type LabelProps = JSX.IntrinsicElements["span"];

const Label = ({ className, children, ...rest }: LabelProps) => (
    <span
        className={ className }
        { ...rest }
    >
        { children }
    </span>
);

export default styled(Label)`
    display:       inline-block;
    background:    ${ props => props.theme.surfaceColor };
    color:         ${ props => props.theme.textColor };
    border-radius: .125rem;

    font-size:      .75rem;
    font-weight:    600;
    line-height:    1.25rem;
    text-transform: uppercase;
    letter-spacing: .0625em;

    padding: 0 .5rem;
    margin:  0 .25rem 0 0;
`;
