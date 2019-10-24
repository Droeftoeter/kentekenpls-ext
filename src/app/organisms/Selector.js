import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import * as Icons from '../icons';
import { Option, Blanket } from '../atoms';
import { Header, Slider, Error } from '../molecules';

import categories from '../categories';

import useRandomVehicle from '../hooks/useRandomVehicle';
import useSelectionState from './selectionState';

const Selector = ({ className, top, left, onVehicle, onCancel }) => {
    const { state: { level, activeRoot, activeChild, category }, enterCategory, leaveCategory } = useSelectionState();
    const { getVehicle, loading, error } = useRandomVehicle();

    /**
     * Deal with keyboard shortcuts
     */
    useEffect(
        () => {
            const handleKeyDown = ({ key }) => {
                if (key === 'Escape') {
                    onCancel();
                }

                if (category && (key === 'Enter' || key === ' ' || key === 'ArrowRight')) {
                    const query = category.items[ activeChild ];

                    if (query) {
                        getVehicle(query.id, query.where, onVehicle);
                    }
                }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            }
        },
        [ getVehicle, category, activeChild ],
    );

    if (error) {
        return (
            <Blanket>
                <Error
                    onClose={ onCancel }
                >
                    { error }
                </Error>
            </Blanket>
        );
    }

    return (
        <div
            className={ className }
            style={ { top, left } }
        >
            <div>
                <motion.div
                    initial={ { height: 0 } }
                    animate={ {
                        height: loading ? '3rem' : `${ (level === 0 ? categories.length : category ? category.items.length : 0) * 3 + 3 }rem` 
                    } }
                    transition={ { ease: "easeInOut", duration: 0.2 } }
                >
                    <Header
                        onBack={ level > 0 ? leaveCategory : undefined }
                        onCancel={ !loading ? onCancel : undefined }
                        loading={ loading }
                    >
                        { loading && 'Kenteken zoeken...' }
                    </Header>
                    { !loading && (
                        <Slider
                            index={ level }
                        >
                            <div>
                                { categories.map(
                                    (category, index) => (
                                        <Option
                                            key={ category.id }
                                            icon={ <Icons.ArrowForward /> }
                                            active={ activeRoot === index }
                                            onClick={ () => enterCategory(category) }
                                        >
                                            { category.title }
                                        </Option>
                                    )
                                ) }
                            </div>
                            { category && (
                                <div>
                                    { category.items.map(
                                        ({ id, title, where }, index) => (
                                            <Option
                                                key={ id }
                                                icon={ <Icons.Input /> }
                                                active={ activeChild === index }
                                                onClick={ () => getVehicle(id, where, onVehicle) }
                                            >
                                                { title }
                                            </Option>
                                        )
                                    ) }
                                </div>
                            ) }
                        </Slider>
                    ) }
                </motion.div>
            </div>
        </div>
    );
};

Selector.propTypes = {
    onVehicle: PropTypes.func.isRequired,
    onCancel:  PropTypes.func.isRequired,
};

export default styled(Selector)`
    position: absolute;
    z-index:  1000000;
    margin:   .25rem 0 0 0;

    background:    #FFFFFF;
    border-radius: .25rem;
    min-width:     15rem;
    box-shadow:    0 0 0.125rem hsla(0, 0%, 0%, 0.12), 0 0.125rem 0.25rem hsla(0, 0%, 0%, 0.24);

    & > div {
        position: relative;

        &:before {
            position:   absolute;
            display:    block;
            content:    ' ';
            z-index:    -1;
            width:      1.25rem;
            height:     1.25rem;
            background: #FFFFFF;
            box-shadow: 0 0 0.125rem hsla(0, 0%, 0%, 0.12), 0 0.125rem 0.25rem hsla(0, 0%, 0%, 0.24);
            top:        -.625rem;
            left:       1.325rem;
            transform:  rotate(-45deg);
        }

        & > div {
            overflow: hidden;
        }
    }

    & header {
        height:        3rem;
        border-radius: .25rem .25rem 0 0;
        background:    #FFFFFF;
        position:      relative;
        z-index:       1;
    }
`;