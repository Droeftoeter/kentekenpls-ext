import React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import ContentLoader from 'react-content-loader';
import { motion, AnimatePresence } from 'framer-motion';

import { RdwOpenDataVehicle } from '../../common/types';

import { Header, Vehicle, VehicleSpecs } from '../molecules';

type VehicleInfoProps = {
    onCancel:   () => void
    onRefresh?: () => void,
    onBack?:    () => void
    vehicle?:   RdwOpenDataVehicle
};

const Loading = () => (
    <ContentLoader
        viewBox="0 0 240 240"
        backgroundColor="hsla(0, 100%, 100%, .12)"
        foregroundColor="hsla(0, 100%, 100%, .24)"
    >
        <rect
            x={ 16 }
            y={ 16 }
            rx={ 2 }
            width={ 48 }
            height={ 20 }
        />

        <rect
            x={ 16 }
            y={ 16 + 20 + 24 }
            rx={ 2 }
            width={ 64 }
            height={ 26 }
        />

        <rect
            x={ 16 }
            y={ 16 + 20 + 24 + 28 }
            rx={ 2 }
            width={ 128 }
            height={ 26 }
        />

        <rect
            x={ 16 }
            y={ 16 + 20 + 24 + 28 + 28 + 24 }
            rx={ 2 }
            width={ 208 }
            height={ 48 }
        />
    </ContentLoader>
);

const Container = styled.div`
    overflow: hidden;

    display: grid;

    max-width: 30rem;
`;

const First = styled(motion.div)`
    grid-column: 1;
    grid-row:    1;
`;

const Second = styled(motion.div)`
    grid-column: 1;
    grid-row:    2;
`;

const VehicleInfo = ({ onCancel, onBack, onRefresh, vehicle }: VehicleInfoProps) => (
    <>
        <Header
            onBack={ onBack }
            onCancel={ onCancel }
            onRefresh={ onRefresh }
        />
        { vehicle ? (
            <Container>
                <AnimatePresence
                    initial={ false }
                    custom={ 0 }
                >
                    <First
                        initial={ { x: '30rem', zIndex: 1 } }
                        animate={ { x: 0, zIndex: 1 } }
                        exit={ { x: '-30rem', zIndex: 0, maxHeight: 0 } }
                        transition={ { ease: "easeInOut", duration: 0.2 } }
                        key={ `${ vehicle.kenteken }-info` }
                    >
                        <Vehicle
                            vehicle={ vehicle }
                        />
                    </First>
                    <Second
                        initial={ { y: '15rem', zIndex: 1 } }
                        animate={ { y: 0, zIndex: 1 } }
                        exit={ { y: '15rem', zIndex: 0, maxHeight: 0 } }
                        transition={ { ease: "easeInOut", duration: 0.3 } }
                        key={ `${ vehicle.kenteken }-specs` }
                    >
                        <VehicleSpecs
                            vehicle={ vehicle }
                        />
                    </Second>
                </AnimatePresence>
            </Container>
        ) : <Loading /> }
    </>
);

export default VehicleInfo;
