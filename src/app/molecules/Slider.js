import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledMotion = styled(motion.div)`
    display:        flex;
    flex-direction: row;    

    & > * {
        flex: 0 0 15rem;
    }    
`;

const Slider = ({ className, index = 0, children }) => (
    <div
        className={ className }
    >
        <StyledMotion
            initial={ { x: 0 } }
            animate={ { x: index === 0 ? 0 : `-${ index * 15 }rem` } }
            transition={ { ease: "easeInOut", duration: 0.2 } }
        >
            { children }
        </StyledMotion>
    </div>
);

Slider.propTypes = {
    className: PropTypes.string,
    index:     PropTypes.number.isRequired,
    children:  PropTypes.node.isRequired,
};

export default styled(Slider)`
    width:          15rem;
    overflow:       hidden;
`;