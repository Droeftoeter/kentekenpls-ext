import React from 'react';

import Svg, { SvgProps } from './Svg';

/**
 * @copyright Google
 * @see https://github.com/google/material-design-icons
 */
const ArrowBack = (props: SvgProps) => (
    <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        preserveAspectRatio="xMinYMin"
        { ...props }
    >
        <path
            d="M0 0h24v24H0z"
            fill="none"
        />
        <path
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
        />
    </Svg>
);

export default ArrowBack;
