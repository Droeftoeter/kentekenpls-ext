import React, { useState, useEffect, useCallback } from 'react';

import { RdwOpenDataVehicle, Query } from '../../common/types';
import sendMessagePromise from '../util/sendMessagePromise';

import { Header, Error } from '../molecules';

import CategorySelector from './CategorySelector';
import VehicleInfo from './VehicleInfo';

type CategorizedRandomVehicleSelectorProps = {
    onVehicle: (vehicle: RdwOpenDataVehicle) => void,
    onCancel:  () => void,
};

const CategorizedRandomVehicleSelector = ({ onVehicle, onCancel }: CategorizedRandomVehicleSelectorProps) => {
    const [ query, setQuery ] = useState<Query|null>(null);
    const [ vehicle, setVehicle ] = useState<RdwOpenDataVehicle|null>(null);
    const [ error, setError ] = useState<string|null>(null);

    const fetchVehicle = useCallback(
        () => {
            if (!query) {
                return () => {};
            }

            sendMessagePromise<RdwOpenDataVehicle>({ action: 'fetch-vehicle', payload: query })
                .then(vehicle => setVehicle(vehicle))
                .catch(error => setError(error.toString()));
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
