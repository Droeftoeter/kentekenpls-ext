import styled from 'styled-components';

const Blanket = styled.div`
    position: absolute;
    top:      0;
    bottom:   0;
    right:    0;
    left:     0;
    z-index:  100000;

    padding:  1rem;

    background: hsla(0, 0%, 0%, .12);

    display:        flex;
    flex-direction: row;
`;

export default Blanket;
