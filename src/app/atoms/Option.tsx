import React, { JSX } from "react";
import styled from "styled-components";

type OptionProps = JSX.IntrinsicElements["a"] & {
  icon: React.ReactNode;
  active: boolean;
};

const Option = ({
  className,
  children,
  icon,
  active,
  ...rest
}: OptionProps) => (
  <a className={className} {...rest}>
    {children}
    {icon}
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

    color: ${(props) => props.theme.subtleTextColor};

    svg {
        height: .875rem;
        width:  auto;
        margin: 0 0 0 auto;
        fill:   ${(props) => props.theme.iconColor};
    }

    &:hover, &:focus {
        background: ${(props) => props.theme.focusColor};
        outline:    none;
    }

    ${(props) =>
      props.active
        ? `
        background: ${props.theme.focusColor};
        outline:    none;
    `
        : ""}
`;
