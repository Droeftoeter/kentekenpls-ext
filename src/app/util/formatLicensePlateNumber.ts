import getSideCode from './getSideCode';

export default function formatLicensePlate(licensePlate: string): string {
    const sideCode = getSideCode(licensePlate);

    switch (sideCode) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            return `${ licensePlate.substr(0, 2) }-${ licensePlate.substr(2, 2) }-${ licensePlate.substr(4, 2) }`;
        case 7:
        case 9:
            return `${ licensePlate.substr(0, 2) }-${ licensePlate.substr(2, 3) }-${ licensePlate.substr(5, 1) }`;
        case 8:
        case 10:
            return `${ licensePlate.substr(0, 1) }-${ licensePlate.substr(1, 3) }-${ licensePlate.substr(4, 2) }`;
        case 11:
        case 14:
            return `${ licensePlate.substr(0, 3) }-${ licensePlate.substr(3, 2) }-${ licensePlate.substr(5, 1) }`;
        case 12:
        case 13:
            return `${ licensePlate.substr(0, 1) }-${ licensePlate.substr(1, 2) }-${ licensePlate.substr(3, 3) }`;
        default:
            return plate;
    }
}
