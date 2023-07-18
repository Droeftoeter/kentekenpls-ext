import styled, { keyframes } from "styled-components";

import { PersonWithFoldingHands } from "../emoji";

const wiggleWiggleAnimation = keyframes`
    from {
        transform: rotate(-8deg);
    }

    to {
        transform: rotate(8deg);
    }
`;

const Loader = styled(PersonWithFoldingHands)`
    animation: ${wiggleWiggleAnimation} 300ms linear infinite alternate;
`;

export default Loader;
