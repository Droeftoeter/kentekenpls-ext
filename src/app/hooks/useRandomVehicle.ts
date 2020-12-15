import { useState } from 'react';

import { RdwOpenDataVehicle } from '../../common/types';

import sendMessagePromise from '../util/sendMessagePromise';

export default function useRandomVehicle() {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState<string|null>(null);

    const getVehicle = async (id: string, where: string[], callback: (vehicle: RdwOpenDataVehicle) => void) => {
        setLoading(true);

        try {
            const vehicle = await sendMessagePromise<RdwOpenDataVehicle>({ action: 'fetch-vehicle', payload: { id, where } });
            callback(vehicle);
        } catch (e) {
            console.error(e);

            setError(e.toString);
        } finally {
            setLoading(false);
        }
    };

    return { getVehicle, loading, error };
}
