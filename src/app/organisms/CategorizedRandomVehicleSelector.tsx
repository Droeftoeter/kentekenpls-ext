import React, { useState, useEffect, useCallback } from 'react';

import { RdwOpenDataVehicle, Query } from '../../common/types';

import { Header, Error } from '../molecules';
import useRandomVehicle from '../hooks/useRandomVehicle';

import CategorySelector from './CategorySelector';
import VehicleInfo from './VehicleInfo';

type CategorizedRandomVehicleSelectorProps = {
    onVehicle: (vehicle: RdwOpenDataVehicle) => void,
    onCancel:  () => void,
};

const CategorizedRandomVehicleSelector = ({ onVehicle, onCancel }: CategorizedRandomVehicleSelectorProps) => {
    const [ query, setQuery ] = useState<Query|null>(null);
    const [ vehicle, setVehicle ] = useState<RdwOpenDataVehicle|null>(null);

    const { getVehicle, loading, error } = useRandomVehicle();

    const fetchVehicle = useCallback(
        () => {
            if (!query) {
                return () => {};
            }

            getVehicle(query.id, query.where, setVehicle);
        },
        [ query ],
    );

    useEffect(
        () => {
            setVehicle(null);

            fetchVehicle()
        },
        [ fetchVehicle ],
    );

    useEffect(
        () => {
            if (vehicle) {
                onVehicle(vehicle);
            }
        },
        [ vehicle ]
    );

    if (error) {
        return (
            <Error
                onClose={ onCancel }
            >
                { error }
            </Error>
        )
    }

    return !query ? (
        <CategorySelector
            onQuery={ query => setQuery(query) }
            onCancel={ onCancel }
        />
    ) :  (
        <VehicleInfo
            onBack={ () => setQuery(null) }
            onRefresh={ () => fetchVehicle() }
            onCancel={ onCancel }
            vehicle={ vehicle || undefined }
        />
    );
};

export default CategorizedRandomVehicleSelector;
