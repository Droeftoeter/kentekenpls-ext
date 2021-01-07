import React from 'react';
import styled from 'styled-components';

import Svg from '../icons/Svg';

export enum LicensePlateVariant {
    NORMAL,
    TAXI,
    LEGACY
}

type LicensePlateProps = JSX.IntrinsicElements["div"] & {
    licensePlate: string
    variant?:     LicensePlateVariant
}

const LicensePlate = ({ className, licensePlate, variant = LicensePlateVariant.NORMAL }: LicensePlateProps) => (
    <div
        className={ className }
    >
        { variant === LicensePlateVariant.NORMAL && (
            <div>
                <Svg
                    role="img"
                    viewBox="0 0 161.74 321.7"
                    preserveAspectRatio="xMinYMin"
                >
                    <polygon
                        points="68.085 231.7 68.085 290.3 36.719 231.41 21.719 231.41 21.719 321.41 36.719 321.41 36.719 262.53 68.085 321.41 68.085 321.7 83.085 321.7 83.085 231.7"
                        fill="#fff"
                    />
                    <polygon
                        points="115.2 306.41 115.2 231.41 100.2 231.41 100.2 321.41 155.2 321.41 155.2 306.41"
                        fill="#fff"
                    />
                    <polygon
                        points="80.618 0 83.867 8.795 93.235 9.167 85.875 14.975 88.416 24 80.618 18.795 72.819 24 75.36 14.975 68 9.167 77.368 8.795"
                        fill="#F7CE09"
                    />
                    <polygon
                        points="12.618 68.5 15.867 77.295 25.235 77.667 17.875 83.475 20.416 92.5 12.618 87.295 4.819 92.5 7.36 83.475 0 77.667 9.368 77.295"
                        fill="#F7CE09"
                    />
                    <polygon
                        points="149.12 68.5 152.37 77.295 161.74 77.667 154.38 83.475 156.92 92.5 149.12 87.295 141.32 92.5 143.86 83.475 136.5 77.667 145.87 77.295"
                        fill="#F7CE09"
                    />
                    <polygon
                        points="138.62 102.5 141.87 111.3 151.24 111.67 143.88 117.48 146.42 126.5 138.62 121.3 130.82 126.5 133.36 117.48 126 111.67 135.37 111.3"
                        fill="#F7CE09"/>
                    <polygon
                        points="21.446 102.5 24.695 111.3 34.064 111.67 26.704 117.48 29.244 126.5 21.446 121.3 13.648 126.5 16.189 117.48 8.829 111.67 18.197 111.3"
                        fill="#F7CE09"
                    />
                    <polygon
                        points="138.62 34 141.87 42.795 151.24 43.167 143.88 48.975 146.42 58 138.62 52.795 130.82 58 133.36 48.975 126 43.167 135.37 42.795"
                        fill="#F7CE09"
                    />
                    <polygon
                        points="21.446 34 24.695 42.795 34.064 43.167 26.704 48.975 29.244 58 21.446 52.795 13.648 58 16.189 48.975 8.829 43.167 18.197 42.795"
                        fill="#F7CE09"
                    />
                    <polygon
                        points="80.618 136.39 83.867 145.18 93.235 145.55 85.875 151.36 88.416 160.39 80.618 155.18 72.819 160.39 75.36 151.36 68 145.55 77.368 145.18"
                        fill="#F7CE09"
                    />
                    <polygon
                        points="115.69 128.39 118.94 137.18 128.3 137.55 120.94 143.36 123.48 152.39 115.69 147.18 107.89 152.39 110.43 143.36 103.07 137.55 112.44 137.18"
                        fill="#F7CE09"
                    />
                    <polygon
                        points="47.187 128.39 50.436 137.18 59.805 137.55 52.445 143.36 54.985 152.39 47.187 147.18 39.389 152.39 41.93 143.36 34.57 137.55 43.938 137.18"
                        fill="#F7CE09"
                    />
                    <polygon
                        points="115.69 10.386 118.94 19.18 128.3 19.553 120.94 25.361 123.48 34.386 115.69 29.18 107.89 34.386 110.43 25.361 103.07 19.553 112.44 19.18"
                        fill="#F7CE09"
                    />
                    <polygon
                        points="47.187 10.386 50.436 19.18 59.805 19.553 52.445 25.361 54.985 34.386 47.187 29.18 39.389 34.386 41.93 25.361 34.57 19.553 43.938 19.18"
                        fill="#F7CE09"
                    />
                </Svg>
            </div>
        ) }
        <div>
            { licensePlate }
        </div>
    </div>
);

export default styled(LicensePlate)`
    display:        flex;
    flex-direction: row;
    height:         3rem;
    width:          14.5rem;

    border-radius: .25rem;

    overflow: hidden;

    & > div:first-child:not(:last-child) {
        background: #2662a2;
        width:      1.5rem;
        flex:       0 0 1.5rem;

        display:         flex;
        flex-direction:  row;
        align-items:     center;
        justify-content: center;

        svg {
            height: 1.75rem;
        }
    }

    & > div:last-child {
        flex: 1 1 auto;

        color:          inherit;
        text-transform: uppercase;
        text-shadow:    -0.0625rem -0.0625rem 0.0625rem rgba(255,255,255,.75);

        font-size: 2rem;

        font-family:    Kenteken, Arial, sans-serif;
        font-weight:    600;
        letter-spacing: .025em;
        line-height:    1.15em;

        display:         flex;
        flex-direction:  row;
        align-items:     flex-end;
        justify-content: center;
    }

    ${ props => props.variant === LicensePlateVariant.LEGACY ? `
        background: #172339;
        color:      #FFFFFF;

        border: .0625rem solid hsla(0, 100%, 100%, .24);

        & > div:last-child {
            text-shadow: none;
        }
    ` : props.variant === LicensePlateVariant.TAXI ? `
        background: #499DDD;
        color:      #111111;
    ` : `
        background: #F4BE04;
        color:      #111111;
    ` }
`;
