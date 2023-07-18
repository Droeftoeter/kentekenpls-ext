import React, { JSX } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import styled from "styled-components";

type SpecProps = JSX.IntrinsicElements["div"] & {
  label: React.ReactNode;
  separator?: string;
};

const Spec = ({
  className,
  children,
  label,
  separator,
  ...rest
}: SpecProps) => {
  // Until Firefox supports the has() CSS selector.
  const renderedChildren = renderToStaticMarkup(<>{children}</>);

  if (renderedChildren) {
    return (
      <div className={className} {...rest}>
        <dt>{label}</dt>
        <dd>{children}</dd>
      </div>
    );
  }

  return null;
};

export default styled(Spec)`
  dt {
    font-size: .875rem;
    letter-spacing: .05em;
    font-weight: 400;
    text-transform: uppercase;
    color: ${(props) => props.theme.textColor};
  }

  dd {
    margin: .5rem 0;

    ${(props) =>
      props.separator &&
      `
        > *:not(:last-child):after {
            content: '${props.separator}';
        }
    `}
  }
`;
