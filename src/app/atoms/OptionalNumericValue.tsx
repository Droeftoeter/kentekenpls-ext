import React from 'react';
import numeral from 'numeral';

type OptionalNumericValueProps = JSX.IntrinsicElements["span"] & {
    value?:  string
    prefix?: string
    suffix?: string
    format?: string
};

const OptionalNumericValue = ({ value, prefix, suffix, format = '0,0', ...rest }: OptionalNumericValueProps) => value ? (
    <span
        { ...rest }
    >
        { `${ prefix ?? '' } ${ numeral(Number(value)).format(format) } ${ suffix ?? '' }`.trim() }
    </span>
) : null;

export default OptionalNumericValue;
