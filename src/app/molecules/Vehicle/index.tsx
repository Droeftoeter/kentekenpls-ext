import React from 'react';
import { DateTime } from 'luxon';

import { RdwOpenDataVehicle } from '../../../common/types';
import { Label, LicensePlate, VehicleColor, WarningLabel } from '../../atoms';
import { LicensePlateVariant } from '../../atoms/LicensePlate';
import { formatLicensePlateNumber, getSideCode } from '../../util';

import { Container, LabelBar } from './styles';

type VehicleProps = JSX.IntrinsicElements["div"] & {
    vehicle: RdwOpenDataVehicle
};

/**
 * Vehicle is import when the date of first admission is before the first issue date
 * in the netherlands
 */
function isImported(vehicle: RdwOpenDataVehicle): boolean {
    if (!vehicle.datum_eerste_toelating || !vehicle.datum_eerste_afgifte_nederland) {
        return false;
    }

    const dateOfFirstAdmission = DateTime.fromISO(vehicle.datum_eerste_toelating);
    const dateOfFirstIssueInNL = DateTime.fromISO(vehicle.datum_eerste_afgifte_nederland);

    if (!dateOfFirstAdmission.isValid || !dateOfFirstIssueInNL.isValid) {
        return false;
    }

    console.log(dateOfFirstAdmission, dateOfFirstIssueInNL);

    return +dateOfFirstAdmission < +dateOfFirstIssueInNL;
}

/**
 * Vehicle is allowed to use a dark blue legacy license plate when
 * the given plate number is either side-code 1, 2 or 3 and
 * the date of first admission is before 1 january 1978
 */
function hasLegacyLicensePlate(vehicle: RdwOpenDataVehicle): boolean {
    const sideCode = getSideCode(vehicle.kenteken);

    if (sideCode > 3) {
        return false;
    }

    if (!vehicle.datum_eerste_toelating) {
        return false;
    }

    const dateOfFirstAdmission = DateTime.fromISO(vehicle.datum_eerste_toelating);

    return dateOfFirstAdmission.isValid && dateOfFirstAdmission.year <= 1977;
}

const Vehicle = ({ vehicle, ...rest }: VehicleProps) => (
    <Container
        { ...rest }
    >
        <LabelBar>
            { vehicle.datum_eerste_toelating && (
                <Label>{ DateTime.fromISO(vehicle.datum_eerste_toelating).toFormat('yyyy') }</Label>
            ) }

            { isImported(vehicle) && (
                <WarningLabel>Import</WarningLabel>
            ) }

            <VehicleColor
                primaryColor={ vehicle.eerste_kleur }
                secondaryColor={ vehicle.tweede_kleur }
            />
        </LabelBar>
        <div>
            <h2>{ vehicle.merk?.toLowerCase() ?? '' }</h2>
            <h3>{ vehicle.handelsbenaming?.toLowerCase() ?? '' }</h3>
        </div>
        <LicensePlate
            licensePlate={ formatLicensePlateNumber(vehicle.kenteken) }
            variant={ hasLegacyLicensePlate(vehicle) ? LicensePlateVariant.LEGACY : vehicle.taxi_indicator === 'Ja' ? LicensePlateVariant.TAXI : LicensePlateVariant.NORMAL }
        />
    </Container>
);

export default Vehicle;
