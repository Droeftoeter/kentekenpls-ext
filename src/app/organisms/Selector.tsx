import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { RdwOpenDataVehicle } from '../../common/types';

import * as Icons from '../icons';
import { Option, Blanket } from '../atoms';
import { Header, Slider, Error } from '../molecules';

import categories from '../categories';

import useRandomVehicle from '../hooks/useRandomVehicle';
import useNavigationStack from '../hooks/useNavigationStack';

type SelectProps = JSX.IntrinsicElements["div"] & {
    top:       number
    left:      number
    onVehicle: (vehicle: RdwOpenDataVehicle) => void
    onCancel:  () => void
};

const Selector = ({ className, top, left, onVehicle, onCancel }: SelectProps) => {
    const { stack, activeChild, push, pop } = useNavigationStack(categories);
    const { getVehicle, loading, error } = useRandomVehicle();

    const category = stack.slice(-1).shift();

    /**
     * Deal with keyboard shortcuts
     */
    useEffect(
        () => {
            const handleKeyDown = async ({ key }: KeyboardEvent) => {
                if (key === 'Escape') {
                    onCancel();
                }

                if (category && (key === 'Enter' || key === ' ' || key === 'ArrowRight')) {
                    const query = category.items[ activeChild ];

                    if ('where' in query) {
                        await getVehicle(query.id, query.where, onVehicle);
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

    if (!category) {
        return null;
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
                        height: loading ? '3rem' : `${ category.items.length * 3 + 3 }rem`
                    } }
                    transition={ { ease: "easeInOut", duration: 0.2 } }
                >
                    <Header
                        onBack={ stack.length > 1 ? pop : undefined }
                        onCancel={ !loading ? onCancel : undefined }
                        loading={ loading }
                    >
                        { loading && 'Kenteken zoeken...' }
                    </Header>
                    { !loading && (
                        <Slider
                            index={ stack.length - 1 }
                        >
                            { stack.map(
                                category => (
                                    <div
                                        key={ category.id }
                                    >
                                        { category.items.map(
                                            (item, index) => 'items' in item ? (
                                                <Option
                                                    key={ item.id }
                                                    icon={ <Icons.ArrowForward /> }
                                                    active={ activeChild === index }
                                                    onClick={ () => push(item) }
                                                >
                                                    { item.title }
                                                </Option>
                                            ) : (
                                                <Option
                                                    key={ item.id }
                                                    icon={ <Icons.Input /> }
                                                    active={ activeChild === index }
                                                    onClick={ () => getVehicle(item.id, item.where, onVehicle) }
                                                >
                                                    { item.title }
                                                </Option>
                                            )
                                        ) }
                                    </div>
                                )
                            ) }
                        </Slider>
                    ) }
                </motion.div>
            </div>
        </div>
    );
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
