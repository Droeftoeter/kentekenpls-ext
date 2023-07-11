import React, { JSX } from 'react';
import { DateTime } from 'luxon';

type OptionalDateValueProps = JSX.IntrinsicElements["time"] & {
    value?: string
};

const OptionalDateValue = ({ value, ...rest }: OptionalDateValueProps) => {
    const dateTime = value
        ? DateTime.fromISO(value)
        : DateTime.invalid('empty value');

    if (dateTime.isValid) {
        return (
            <time
                dateTime={ dateTime.toISODate() ?? undefined }
                { ...rest }
            >
                { dateTime.toLocaleString(DateTime.DATE_FULL) }
            </time>
        );
    }

    return null;
};

export default OptionalDateValue;
