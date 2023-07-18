import React, { JSX } from "react";
import styled, { css } from "styled-components";

type LabelProps = JSX.IntrinsicElements["span"] & {
  variant?: "black" | "green" | "yellow" | "lightBlue" | "blue" | "cyan";
};

const Label = ({ className, children, ...rest }: LabelProps) => (
  <span className={className} {...rest}>
    {children}
  </span>
);

export default styled(Label)`
    display:       inline-block;
    border-radius: .125rem;

    font-size:      .75rem;
    font-weight:    600;
    line-height:    1.25rem;
    text-transform: uppercase;
    letter-spacing: .0625em;
    padding:        0 .5rem;

    ${(props) => {
      switch (props.variant) {
        case "black":
          return css`
            background: ${(props) => props.theme.labelColors.black.background};
            color:      ${(props) => props.theme.labelColors.black.foreground};
          `;
        case "green":
          return css`
            background: ${(props) => props.theme.labelColors.green.background};
            color:      ${(props) => props.theme.labelColors.green.foreground};
          `;
        case "yellow":
          return css`
            background: ${(props) => props.theme.labelColors.yellow.background};
            color:      ${(props) => props.theme.labelColors.yellow.foreground};
          `;
        case "lightBlue":
          return css`
            background: ${(props) =>
              props.theme.labelColors.lightBlue.background};
            color:      ${(props) =>
              props.theme.labelColors.lightBlue.foreground};
          `;
        case "blue":
          return css`
            background: ${(props) => props.theme.labelColors.blue.background};
            color:      ${(props) => props.theme.labelColors.blue.foreground};
          `;
        case "cyan":
          return css`
            background: ${(props) => props.theme.labelColors.cyan.background};
            color:      ${(props) => props.theme.labelColors.cyan.foreground};
          `;
        default:
          return css`
            background: ${(props) => props.theme.surfaceColor};
            color:      ${(props) => props.theme.textColor};
          `;
      }
    }}
`;
