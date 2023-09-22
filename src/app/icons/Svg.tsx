import React from "react";

export type SvgProps = JSX.IntrinsicElements["svg"] & {
  title: string;
  desc?: string;
};

const Svg = ({ title, desc, children, ...rest }: SvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" role="img" {...rest}>
    <title>{title}</title>
    {desc && <desc>{desc}</desc>}
    {children}
  </svg>
);

export default Svg;
