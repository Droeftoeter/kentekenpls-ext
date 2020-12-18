import React, { useEffect } from 'react';

import { RdwOpenDataVehicle } from '../../common/types';

import * as Icons from '../icons';
import { Option } from '../atoms';
import { Header, Slider, Error } from '../molecules';

import categories from '../categories';

import useRandomVehicle from '../hooks/useRandomVehicle';
import useNavigationStack from '../hooks/useNavigationStack';

type SelectProps = JSX.IntrinsicElements["div"] & {
    onVehicle: (vehicle: RdwOpenDataVehicle) => void
    onCancel:  () => void
};

const Selector = ({ onVehicle, onCancel }: SelectProps) => {
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
            <Error
                onClose={ onCancel }
            >
                { error }
            </Error>
        );
    }

    if (!category) {
        return null;
    }

    return (
        <>
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
        </>
    );
};

export default Selector;
