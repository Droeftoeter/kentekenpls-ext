import React, { JSX } from "react";
import styled from "styled-components";

import Spec from "./Spec";
import StringValue from "./StringValue";
import DateValue from "./DateValue";
import NumberValue from "./NumberValue";

type SpecSheetComposition = {
  NumberValue: typeof NumberValue;
  DateValue: typeof DateValue;
  StringValue: typeof StringValue;
  Spec: typeof Spec;
};

type SpecSheetProps = JSX.IntrinsicElements["div"];

const Container = styled.div`
  color: ${(props) => props.theme.subtleTextColor};

  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:empty {
    display: none;
  }
`;

const SpecSheet: ((props: SpecSheetProps) => JSX.Element) &
  SpecSheetComposition = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

SpecSheet.NumberValue = NumberValue;
SpecSheet.DateValue = DateValue;
SpecSheet.StringValue = StringValue;
SpecSheet.Spec = Spec;

export default SpecSheet;
