import React, { JSX } from "react";
import styled from "styled-components";

type IconButtonProps = JSX.IntrinsicElements["button"];

const IconButton = ({
  className,
  onClick,
  children,
  ...rest
}: IconButtonProps) => (
  <button type="button" className={className} onClick={onClick} {...rest}>
    {children}
  </button>
);

export default styled(IconButton)`
    all: unset;
    height: 2rem;
    width:  2rem;
    cursor: pointer;

    border-radius: 1rem;

    svg {
        fill:   ${(props) => props.theme.iconColor};
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
        background: ${(props) => props.theme.focusColor};
        outline:    none;
    }
`;
