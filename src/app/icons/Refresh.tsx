import React from 'react';

import Svg, { SvgProps } from './Svg';

/**
 * @copyright Michael Amprimo
 * @see https://github.com/michaelampr/jam
 * @license MIT
 */
const Refresh = (props: SvgProps) => (
    <Svg
        viewBox="-1.5 -2.5 24 24"
        width="24"
        height="24"
        preserveAspectRatio="xMinYMin"
        { ...props }
    >
        <path
            d="M17.83 4.194l.42-1.377a1 1 0 1 1 1.913.585l-1.17 3.825a1 1 0 0 1-1.248.664l-3.825-1.17a1 1 0 1 1 .585-1.912l1.672.511A7.381 7.381 0 0 0 3.185 6.584l-.26.633a1 1 0 1 1-1.85-.758l.26-.633A9.381 9.381 0 0 1 17.83 4.194zM2.308 14.807l-.327 1.311a1 1 0 1 1-1.94-.484l.967-3.88a1 1 0 0 1 1.265-.716l3.828.954a1 1 0 0 1-.484 1.941l-1.786-.445a7.384 7.384 0 0 0 13.216-1.792 1 1 0 1 1 1.906.608 9.381 9.381 0 0 1-5.38 5.831 9.386 9.386 0 0 1-11.265-3.328z"
        />
    </Svg>
);

export default Refresh;
