import styled from 'styled-components';

import { VehicleColor } from '../../atoms';

export const Container = styled.div`
    position: relative;

    padding:    1rem 1rem 1.5rem;
    width:      30rem;
    box-sizing: border-box;

    color: ${ props => props.theme.textColor };

    background: linear-gradient(315deg, rgba(18,18,18,1) 0%, rgba(38,38,38,1) 80%);

    h2 {
        font-size:      1.5rem;
        color:          ${ props => props.theme.textColor };
        margin:         0;
        text-transform: capitalize;
    }

    h3 {
        font-size:      1.5rem;
        font-weight:    400;
        color:          ${ props => props.theme.subtleTextColor };
        text-transform: capitalize;
        margin:         0;
    }

    & > * + * {
        margin: 1.5rem 0 0 0;
    }
`;

export const LabelBar = styled.div`
    display:        flex;
    flex-direction: row;
    align-items:    center;

    & > * {
        margin: 0 .5rem 0 0;
    }

    ${ VehicleColor } {
        margin: 0 0 0 auto;
    }
`;
