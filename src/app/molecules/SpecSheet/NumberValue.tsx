import React from "react";

type NumberValueProps = {
  value?: string;
  prefix?: string;
  suffix?: string;
} & Intl.NumberFormatOptions;

const NumberValue = ({
  value,
  prefix,
  suffix,
  ...options
}: NumberValueProps) => {
  const numericValue = Number(value);

  if (value === undefined || value === null || isNaN(numericValue)) {
    return null;
  }

  return (
    <span>
      {`${prefix ?? ""}${new Intl.NumberFormat(undefined, options).format(
        numericValue,
      )}${suffix ?? ""}`.trim()}
    </span>
  );
};

export default NumberValue;
