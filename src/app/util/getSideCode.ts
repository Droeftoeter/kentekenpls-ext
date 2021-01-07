const expressions = [
    /^[a-zA-Z]{2}[\d]{2}[\d]{2}$/,      // Sidecode  1: XX-99-99
    /^[\d]{2}[\d]{2}[a-zA-Z]{2}$/,      // Sidecode  2: 99-99-XX
    /^[\d]{2}[a-zA-Z]{2}[\d]{2}$/,      // Sidecode  3: 99-XX-99
    /^[a-zA-Z]{2}[\d]{2}[a-zA-Z]{2}$/,  // Sidecode  4: XX-99-XX
    /^[a-zA-Z]{2}[a-zA-Z]{2}[\d]{2}$/,  // Sidecode  5: XX-XX-99
    /^[\d]{2}[a-zA-Z]{2}[a-zA-Z]{2}$/,  // Sidecode  6: 99-XX-XX
    /^[\d]{2}[a-zA-Z]{3}[\d]{1}$/,      // Sidecode  7: 99-XXX-9
    /^[\d]{1}[a-zA-Z]{3}[\d]{2}$/,      // Sidecode  8: 9-XXX-99
    /^[a-zA-Z]{2}[\d]{3}[a-zA-Z]{1}$/,  // Sidecode  9: XX-999-X
    /^[a-zA-Z]{1}[\d]{3}[a-zA-Z]{2}$/,  // Sidecode 10: X-999-XX
    /^[a-zA-Z]{3}[\d]{2}[a-zA-Z]{1}$/,  // Sidecode 11: XXX-99-X
    /^[a-zA-Z]{1}[\d]{2}[a-zA-Z]{3}$/,  // Sidecode 12: X-99-XXX
    /^[\d]{1}[a-zA-Z]{2}[\d]{3}$/,      // Sidecode 13: 9-XX-999
    /^[\d]{3}[a-zA-Z]{2}[\d]{1}$/       // Sidecode 14: 999-XX-9
];

export default function getSideCode(licensePlate: string): number {
    return expressions.findIndex(expression => expression.test(licensePlate)) + 1;
}
