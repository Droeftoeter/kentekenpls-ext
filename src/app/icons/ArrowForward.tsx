import React from "react";

import Svg, { SvgProps } from "./Svg";

/**
 * @copyright Google
 * @see https://github.com/google/material-design-icons
 */
const ArrowForward = (props: SvgProps) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMinYMin"
    {...props}
  >
    <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </Svg>
);

export default ArrowForward;
