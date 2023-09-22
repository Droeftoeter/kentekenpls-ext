import React from "react";
import styled from "styled-components";

type IconButtonProps = JSX.IntrinsicElements["a"];

const IconButton = ({
  className,
  onClick,
  children,
  ...rest
}: IconButtonProps) => (
  <a
    className={className}
    role="button"
    onClick={onClick}
    tabIndex={1}
    {...rest}
  >
    {children}
  </a>
);

export default styled(IconButton)`
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
