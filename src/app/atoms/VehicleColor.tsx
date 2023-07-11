import React, { JSX } from 'react';
import styled from 'styled-components';

import { RdwOpenDataVehicleColor } from '../../common/types';

const ColorMap: Record<RdwOpenDataVehicleColor, string> = {
    'BEIGE':              '#E1C699',
    'BLAUW':              '#1E88E5',
    'BRUIN':              '#6D4C41',
    'CREME':              '#FFFDD0',
    'GRIJS':              '#C0C0C0',
    'GROEN':              '#66BB6A',
    'ORANJE':             '#FF9800',
    'PAARS':              '#AB47BC',
    'ROOD':               '#EF5350',
    'ROSE':               '#F06292',
    'WIT':                '#FFFFFF',
    'ZWART':              '#000000',
    'Niet geregistreerd': '',
};

type VehicleColorProps = JSX.IntrinsicElements["svg"] & {
    primaryColor?:   RdwOpenDataVehicleColor
    secondaryColor?: RdwOpenDataVehicleColor
};

const VehicleColor = ({ className, primaryColor, secondaryColor }: VehicleColorProps) => {
    const colorNames = [ primaryColor, secondaryColor ].filter(c => c && c !== 'Niet geregistreerd') as RdwOpenDataVehicleColor[];

    return colorNames.length ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            width={ 16 }
            height={ 16 }
            viewBox="0 0 16 16"
            preserveAspectRatio="xMinYMin"
            className={ className }
        >
            <title>{ colorNames.join(', ') }</title>
            <rect
                width="16"
                height="16"
                fill={ ColorMap[ colorNames[ 0 ] ] }
            />
            { colorNames.length > 1 && (
                <polygon
                    points="16,0 16,16 0,16"
                    fill={ ColorMap[ colorNames[ 1 ] ] }
                />
            ) }
        </svg>
    ) : null;
};

export default styled(VehicleColor)`
    border-radius: .125rem;
`;
