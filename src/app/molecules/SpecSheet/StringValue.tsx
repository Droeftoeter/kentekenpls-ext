import React from "react";

type StringValueProps = {
  value?: string;
  prefix?: string;
  suffix?: string;
};

const StringValue = ({ value, prefix, suffix }: StringValueProps) =>
  value ? <span>{`${prefix ?? ""}${value}${suffix ?? ""}`.trim()}</span> : null;

export default StringValue;
