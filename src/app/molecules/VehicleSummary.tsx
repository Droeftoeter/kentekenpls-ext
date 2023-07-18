import React from "react";
import { getYear, parseISO } from "date-fns";
import styled from "styled-components";

import { ExtendedOpenDataVehicle } from "../../common/types";
import {
  FuelLabel,
  Label,
  LicensePlate,
  VehicleColor,
  WarningLabel,
} from "../atoms";
import { LicensePlateVariant } from "../atoms/LicensePlate";
import {
  formatLicensePlate,
  isImported,
  hasLegacyLicensePlate,
} from "../util/vehicle";

const LabelBar = styled.div`
  display:        flex;
  flex-direction: row;
  align-items:    center;
  gap:            .5rem;

  ${VehicleColor} {
    margin: 0 0 0 auto;
  }
`;

type VehicleSummaryProps = JSX.IntrinsicElements["div"] & {
  vehicle: ExtendedOpenDataVehicle;
};

const VehicleSummary = ({
  vehicle,
  className,
  ...rest
}: VehicleSummaryProps) => (
  <div className={className} {...rest}>
    <LabelBar>
      {vehicle.datum_eerste_toelating && (
        <Label>{getYear(parseISO(vehicle.datum_eerste_toelating))}</Label>
      )}

      {isImported(vehicle) && <WarningLabel>Import</WarningLabel>}
      <FuelLabel fuelTypes={vehicle.brandstof_omschrijving ?? []} />

      <VehicleColor
        primaryColor={vehicle.eerste_kleur}
        secondaryColor={vehicle.tweede_kleur}
      />
    </LabelBar>
    <div>
      <h2>{vehicle.merk?.toLowerCase() ?? ""}</h2>
      <h3>{vehicle.handelsbenaming?.toLowerCase() ?? ""}</h3>
    </div>
    <LicensePlate
      licensePlate={formatLicensePlate(vehicle.kenteken)}
      variant={
        hasLegacyLicensePlate(vehicle)
          ? LicensePlateVariant.LEGACY
          : vehicle.taxi_indicator === "Ja"
          ? LicensePlateVariant.TAXI
          : LicensePlateVariant.NORMAL
      }
    />
  </div>
);

export default styled(VehicleSummary)`
  position: relative;

  padding:    1rem 1rem 1.5rem;
  width:      30rem;
  box-sizing: border-box;

  display:        flex;
  flex-direction: column;
  gap:            1.5rem;

  color: ${(props) => props.theme.textColor};

  h2 {
      font-size:      1.5rem;
      color:          ${(props) => props.theme.textColor};
      margin:         0;
      text-transform: capitalize;
  }

  h3 {
      font-size:      1.5rem;
      font-weight:    400;
      color:          ${(props) => props.theme.subtleTextColor};
      text-transform: capitalize;
      margin:         0;
  }
`;
