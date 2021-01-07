import React from 'react';

type OptionalStringValueProps = JSX.IntrinsicElements["span"] & {
    value?:  string
    prefix?: string
    suffix?: string
};

const OptionalStringValue = ({ value, prefix, suffix, ...rest }: OptionalStringValueProps) => value ? (
    <span
        { ...rest }
    >
        { `${ prefix ?? '' } ${ value } ${ suffix ?? '' }`.trim() }
    </span>
) : null;

export default OptionalStringValue;
