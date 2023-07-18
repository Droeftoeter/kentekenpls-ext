import React from "react";
import { parseISO, isValid } from "date-fns";

type DateValueProps = {
  value?: string;
};

const DateValue = ({ value }: DateValueProps) => {
  const date = value ? parseISO(value) : null;

  if (date === null || !isValid(date)) {
    return null;
  }

  return (
    <time dateTime={date.toISOString()}>
      {new Intl.DateTimeFormat().format(date)}
    </time>
  );
};

export default DateValue;
