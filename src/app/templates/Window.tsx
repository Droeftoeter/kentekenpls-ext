import React from "react";
import styled from "styled-components";

type WindowProps = JSX.IntrinsicElements["div"] & {
  top: number;
  left: number;
};

const Window = ({ className, children, top, left, ...rest }: WindowProps) => (
  <div className={className} style={{ top, left }} {...rest}>
    <div>{children}</div>
  </div>
);

export default styled(Window)`
    position: absolute;
    z-index:  1000000;
    margin:   .25rem 0 0 0;

    background:    ${(props) => props.theme.surfaceColor};
    border-radius: .25rem;
    min-width:     15rem;
    box-shadow:    0 0 0.125rem hsla(0, 0%, 0%, 0.12),
                   0 0.125rem 0.25rem hsla(0, 0%, 0%, 0.24);

    & > div {
        position: relative;

        &:before {
            position:   absolute;
            display:    block;
            content:    ' ';
            z-index:    -1;
            width:      1.25rem;
            height:     1.25rem;
            background: ${(props) => props.theme.surfaceColor};
            box-shadow: 0 0 0.125rem hsla(0, 0%, 0%, 0.12),
                        0 0.125rem 0.25rem hsla(0, 0%, 0%, 0.24);
            top:        -.625rem;
            left:       1.325rem;
            transform:  rotate(-45deg);
        }

        & > div {
            overflow: hidden;
        }
    }
`;
