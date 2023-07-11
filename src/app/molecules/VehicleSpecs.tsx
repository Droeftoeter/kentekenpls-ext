import React, { JSX } from 'react';
import styled from 'styled-components';

import { RdwOpenDataVehicle } from '../../common/types';
import { OptionalDateValue, OptionalNumericValue, Specification } from '../atoms';

type VehicleSpecsProps = JSX.IntrinsicElements["div"] & {
    vehicle: RdwOpenDataVehicle
}

const VehicleSpecs = ({ className, vehicle, ...rest }: VehicleSpecsProps) => (
    <div
        className={ className }
        { ...rest }
    >
        <div>
            <Specification
                label="Cataloguswaarde"
            >
                { vehicle.catalogusprijs && (
                    <OptionalNumericValue
                        value={ vehicle.catalogusprijs }
                        prefix="€"
                    />
                ) }
            </Specification>

            <Specification
                label="Massa ledig / rijklaar"
                separator=" / "
            >
                { vehicle.massa_ledig_voertuig && (
                    <OptionalNumericValue
                        value={ vehicle.massa_ledig_voertuig }
                        suffix=" kg"
                    />
                ) }
                { vehicle.massa_rijklaar && (
                    <OptionalNumericValue
                        value={ vehicle.massa_rijklaar }
                        suffix=" kg"
                    />
                ) }
            </Specification>

            <Specification
                label="Cilinders / inhoud"
                separator=" / "
            >
                { vehicle.aantal_cilinders && (
                    <OptionalNumericValue
                        value={ vehicle.aantal_cilinders }
                    />
                ) }
                { vehicle.cilinderinhoud && (
                    <OptionalNumericValue
                        value={ vehicle.cilinderinhoud }
                        suffix=" cc"
                    />
                ) }
            </Specification>

            <Specification
                label="Relatief vermogen"
            >
                { vehicle.vermogen_massarijklaar && (
                    <OptionalNumericValue
                        value={ vehicle.vermogen_massarijklaar }
                        format="0.00"
                    />
                ) }
            </Specification>
        </div>
        <div>
            <Specification
                label="Tenaamstelling"
            >
                { vehicle.datum_tenaamstelling && (
                    <OptionalDateValue
                        value={ vehicle.datum_tenaamstelling }
                    />
                ) }
            </Specification>

            <Specification
                label="Eerste toelating"
            >
                { vehicle.datum_eerste_toelating && (
                    <OptionalDateValue
                        value={ vehicle.datum_eerste_toelating }
                    />
                ) }
            </Specification>

            <Specification
                label="Eerste afgifte"
            >
                { vehicle.datum_eerste_afgifte_nederland && (
                    <OptionalDateValue
                        value={ vehicle.datum_eerste_afgifte_nederland }
                    />
                ) }
            </Specification>
        </div>
    </div>
);

export default styled(VehicleSpecs)`
    padding: 1rem;
    margin:  0;

    width: 30rem;

    box-sizing: border-box;

    background: ${ props => props.theme.focusColor };
    color:      ${ props => props.theme.textColor };

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

  dt {
        font-size: .875rem;
      letter-spacing: .05em;
      font-weight: 400;


      text-transform: uppercase;
      color:          ${ props => props.theme.subtleTextColor };
  }

  dd {

      margin: .5rem 0;
  }

    & > * {
        flex: 0 0 13.5rem;

        & > * + * {
            margin: 1.5rem 0 0 0;
        }
    }
`;
