import React, { Children } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledMotion = styled(motion.div)`
    display:        flex;
    flex-direction: row;

    & > * {
        flex: 0 0 15rem;
    }
`;

type SliderProps = JSX.IntrinsicElements["div"] & {
    index?: number
};

const Slider = ({ className, index = 0, children }: SliderProps) => (
    <div
        className={ className }
    >
        <StyledMotion
            initial={ { x: 0 } }
            animate={ { x: index === 0 ? 0 : `-${ index * 15 }rem` } }
            transition={ { ease: "easeInOut", duration: 0.2 } }
        >
            { Children.map(
                children,
                (child, i) => (
                    <div
                        style={ i === index ? {} : {
                            maxHeight: 0,
                            overflow:  'hidden',
                        } }
                        key={ `slide-${ i }` }
                    >
                        { child }
                    </div>
                )
            ) }
        </StyledMotion>
    </div>
);

export default styled(Slider)`
    width:          15rem;
    overflow:       hidden;
`;
