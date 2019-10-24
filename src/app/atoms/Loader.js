import styled, { keyframes } from 'styled-components';

import { PersonWithFoldingHands } from '../emoji';

const t = keyframes`
    from {
        transform: rotate(-8deg);
    }
    
    to {
        transform: rotate(8deg);
    }
`;

export default styled(PersonWithFoldingHands)`
    animation: ${ t } 300ms linear infinite alternate;
`;