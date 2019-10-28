import { useState } from 'react';

import sendMessagePromise from '../util/sendMessagePromise';

export default function useRandomVehicle() {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const getVehicle = async (id, where, callback) => {
        setLoading(true);

        try {
            const vehicle = await sendMessagePromise({ action: 'fetch-vehicle', payload: { id, where } });
            callback(vehicle);
        } catch (e) {
            console.error(e);

            setError(e);
            setLoading(false);
        }
    };

    return { getVehicle, loading, error };
}