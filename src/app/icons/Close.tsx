import React from "react";

import Svg, { type SvgProps } from "./Svg";

/**
 * @copyright Google
 * @see https://github.com/google/material-design-icons
 */
const Close = (props: SvgProps) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMinYMin"
    {...props}
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </Svg>
);

export default Close;
