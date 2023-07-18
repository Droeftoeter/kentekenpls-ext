import React, { JSX } from "react";
import styled from "styled-components";

import { ExtendedOpenDataVehicle } from "../../common/types";
import { SpecSheet } from "./";

type VehicleSpecSheetProps = JSX.IntrinsicElements["div"] & {
  vehicle: ExtendedOpenDataVehicle;
};

const VehicleSpecSheet = ({
  className,
  vehicle,
  ...rest
}: VehicleSpecSheetProps) => (
  <div className={className} {...rest}>
    <SpecSheet>
      <SpecSheet.Spec label="Cataloguswaarde">
        <SpecSheet.NumberValue
          value={vehicle.catalogusprijs}
          style="currency"
          currency="EUR"
          maximumFractionDigits={0}
        />
      </SpecSheet.Spec>

      <SpecSheet.Spec label="Massa ledig / rijklaar" separator=" / ">
        <SpecSheet.NumberValue
          value={vehicle.massa_ledig_voertuig}
          style="unit"
          unit="kilogram"
          maximumFractionDigits={0}
        />
        <SpecSheet.NumberValue
          value={vehicle.massa_rijklaar}
          style="unit"
          unit="kilogram"
          maximumFractionDigits={0}
        />
      </SpecSheet.Spec>

      <SpecSheet.Spec label="Cilinders / inhoud" separator=" / ">
        <SpecSheet.NumberValue
          value={vehicle.aantal_cilinders}
          maximumFractionDigits={0}
        />
        <SpecSheet.NumberValue
          value={vehicle.cilinderinhoud}
          suffix=" cm³" // volume-centimeter is not supported.
          maximumFractionDigits={0}
        />
      </SpecSheet.Spec>

      <SpecSheet.Spec label="Cilinders / inhoud" separator=" / ">
        <SpecSheet.NumberValue value={undefined} maximumFractionDigits={0} />
        <SpecSheet.NumberValue
          value={undefined}
          suffix=" cm³" // volume-centimeter is not supported.
          maximumFractionDigits={0}
        />
      </SpecSheet.Spec>

      <SpecSheet.Spec label="Relatief vermogen" separator=" ">
        <SpecSheet.NumberValue
          value={vehicle.vermogen_massarijklaar}
          maximumFractionDigits={2}
        />
        <SpecSheet.NumberValue
          value={vehicle.nettomaximumvermogen}
          prefix="("
          suffix=" kW)" // kilowatt is not supported, while kilowatt-hour is...
        />
      </SpecSheet.Spec>
    </SpecSheet>

    <SpecSheet>
      <SpecSheet.Spec label="Brandstof" separator=", ">
        {vehicle.brandstof_omschrijving?.map((brandstof) => (
          <SpecSheet.StringValue key={brandstof} value={brandstof} />
        ))}
      </SpecSheet.Spec>

      <SpecSheet.Spec label="Tenaamstelling">
        <SpecSheet.DateValue value={vehicle.datum_tenaamstelling} />
      </SpecSheet.Spec>

      <SpecSheet.Spec label="Eerste tenaamstelling">
        <SpecSheet.DateValue
          value={vehicle.datum_eerste_tenaamstelling_in_nederland}
        />
      </SpecSheet.Spec>

      <SpecSheet.Spec label="Eerste toelating">
        <SpecSheet.DateValue value={vehicle.datum_eerste_toelating} />
      </SpecSheet.Spec>
    </SpecSheet>
  </div>
);

export default styled(VehicleSpecSheet)`
    padding: 1rem;
    margin:  0;
    width: 30rem;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;
