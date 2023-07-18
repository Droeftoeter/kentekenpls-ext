import { getYear, parseISO, isValid } from "date-fns";
import type { ExtendedOpenDataVehicle } from "../../common/types";

/**
 * Vehicle is import when the date of first admission is before the first issue date
 * in the netherlands
 */
export function isImported(vehicle: ExtendedOpenDataVehicle): boolean {
  if (
    !vehicle.datum_eerste_toelating ||
    !vehicle.datum_eerste_tenaamstelling_in_nederland
  ) {
    return false;
  }

  const dateOfFirstAdmission = parseISO(vehicle.datum_eerste_toelating);
  const dateOfFirstIssueInNL = parseISO(
    vehicle.datum_eerste_tenaamstelling_in_nederland,
  );

  if (!isValid(dateOfFirstAdmission) || !isValid(dateOfFirstIssueInNL)) {
    return false;
  }

  return +dateOfFirstAdmission < +dateOfFirstIssueInNL;
}

/**
 * Vehicle is allowed to use a dark blue legacy license plate when
 * the given plate number is either side-code 1, 2 or 3 and
 * the date of first admission is before 1 january 1978
 */
export function hasLegacyLicensePlate(
  vehicle: ExtendedOpenDataVehicle,
): boolean {
  const sideCode = getSideCode(vehicle.kenteken);

  if (sideCode > 3) {
    return false;
  }

  if (!vehicle.datum_eerste_toelating) {
    return false;
  }

  const dateOfFirstAdmission = parseISO(vehicle.datum_eerste_toelating);

  return isValid(dateOfFirstAdmission) && getYear(dateOfFirstAdmission) <= 1977;
}

const sideCodePatterns = [
  /^[a-zA-Z]{2}[\d]{2}[\d]{2}$/, // Sidecode  1: XX-99-99
  /^[\d]{2}[\d]{2}[a-zA-Z]{2}$/, // Sidecode  2: 99-99-XX
  /^[\d]{2}[a-zA-Z]{2}[\d]{2}$/, // Sidecode  3: 99-XX-99
  /^[a-zA-Z]{2}[\d]{2}[a-zA-Z]{2}$/, // Sidecode  4: XX-99-XX
  /^[a-zA-Z]{2}[a-zA-Z]{2}[\d]{2}$/, // Sidecode  5: XX-XX-99
  /^[\d]{2}[a-zA-Z]{2}[a-zA-Z]{2}$/, // Sidecode  6: 99-XX-XX
  /^[\d]{2}[a-zA-Z]{3}[\d]{1}$/, // Sidecode  7: 99-XXX-9
  /^[\d]{1}[a-zA-Z]{3}[\d]{2}$/, // Sidecode  8: 9-XXX-99
  /^[a-zA-Z]{2}[\d]{3}[a-zA-Z]{1}$/, // Sidecode  9: XX-999-X
  /^[a-zA-Z]{1}[\d]{3}[a-zA-Z]{2}$/, // Sidecode 10: X-999-XX
  /^[a-zA-Z]{3}[\d]{2}[a-zA-Z]{1}$/, // Sidecode 11: XXX-99-X
  /^[a-zA-Z]{1}[\d]{2}[a-zA-Z]{3}$/, // Sidecode 12: X-99-XXX
  /^[\d]{1}[a-zA-Z]{2}[\d]{3}$/, // Sidecode 13: 9-XX-999
  /^[\d]{3}[a-zA-Z]{2}[\d]{1}$/, // Sidecode 14: 999-XX-9
];

/**
 * Detects license plate sidecode based on pattern.
 */
export function getSideCode(licensePlate: string): number {
  return (
    sideCodePatterns.findIndex((pattern) => pattern.test(licensePlate)) + 1
  );
}

/**
 * Detects the sidecode for the license plate and formats accordingly.
 */
export function formatLicensePlate(licensePlate: string): string {
  const sideCode = getSideCode(licensePlate);

  switch (sideCode) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return `${licensePlate.substring(0, 2)}-${licensePlate.substring(
        2,
        4,
      )}-${licensePlate.substring(4, 6)}`;
    case 7:
    case 9:
      return `${licensePlate.substring(0, 2)}-${licensePlate.substring(
        2,
        5,
      )}-${licensePlate.substring(5, 6)}`;
    case 8:
    case 10:
      return `${licensePlate.substring(0, 1)}-${licensePlate.substring(
        1,
        4,
      )}-${licensePlate.substring(4, 6)}`;
    case 11:
    case 14:
      return `${licensePlate.substring(0, 3)}-${licensePlate.substring(
        3,
        5,
      )}-${licensePlate.substring(5, 6)}`;
    case 12:
    case 13:
      return `${licensePlate.substring(0, 1)}-${licensePlate.substring(
        1,
        3,
      )}-${licensePlate.substring(3, 6)}`;
    default:
      return licensePlate;
  }
}
