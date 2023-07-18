import React from "react";

import { RdwOpenDataVehicleFuelDescription } from "../../background/api";
import { intersect, equals } from "../util/array";

import Label from "./Label";

const fuelMap: [
  match: (fuelTypes: RdwOpenDataVehicleFuelDescription[]) => boolean,
  variant: "black" | "green" | "yellow" | "lightBlue" | "blue" | "cyan",
  label: string,
][] = [
  [
    (fuelTypes) => equals(["Elektriciteit", "Benzine"], fuelTypes),
    "blue",
    "Hybride",
  ],
  [
    (fuelTypes) => equals(["Elektriciteit", "Diesel"], fuelTypes),
    "blue",
    "Hybride",
  ],
  [(fuelTypes) => equals(["Diesel"], fuelTypes), "black", "Diesel"],
  [(fuelTypes) => equals(["Benzine"], fuelTypes), "green", "Benzine"],
  [(fuelTypes) => equals(["Elektriciteit"], fuelTypes), "yellow", "Elektrisch"],
  [
    (fuelTypes) => intersect(["CNG", "LPG", "LNG"], fuelTypes).length > 0,
    "cyan",
    "Gas",
  ],
  [(fuelTypes) => equals(["Waterstof"], fuelTypes), "lightBlue", "Waterstof"],
];

type Props = {
  fuelTypes: RdwOpenDataVehicleFuelDescription[];
  children?: React.ReactNode;
};

const FuelLabel = ({ fuelTypes }: Props) => {
  const [, variant, label] = fuelMap.find(([match]) => match(fuelTypes)) ?? [];

  if (!variant) {
    return null;
  }

  return <Label variant={variant}>{label}</Label>;
};

export default FuelLabel;
