import { useState } from 'react';
import Dexie from 'dexie';

import fetchVehicles from './brv';

// Define our database
const db = new Dexie('kentekenpls');
db.version(1).stores({
    vehicles: '++id, [queryKey+digest], queryKey',
});

/**
 * Clean-up our internal database by removing records with a different query-digest.
 *
 * @param {string} queryKey 
 * @param {string} digest 
 */
async function cleanup (queryKey, digest) {
    try {
        const vehicleIds = db.vehicles
            .where({ queryKey })
            .and(v => v.digest !== digest)
            .uniqueKeys();

        if (vehicleIds.length) {
            db.vehicles.bulkDelete(vehicleIds);
        }
    } catch (e) {
        console.error(e);
    }
};

/**
 * Creates a digest from the where-clause
 *
 * @param {string} input 
 */
async function createDigest(input) {
    const encoder = new TextEncoder();

    return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-1', encoder.encode(input))))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

/**
 * Grabs a random vehicle for the given query from our offline-storage or the RDW database.
 */
export default function useRandomVehicle() {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const next = async (queryKey, where, callback) => {
        setLoading(true);

        const digest = await createDigest(where.join(''));

        try {
            const storedVehicles = await db.vehicles
                .where({ queryKey, digest })
                .toArray();


            if (!storedVehicles.length) {
                const fetchedVehicles = await fetchVehicles(where);
                const vehicle = fetchedVehicles.shift();

                callback(vehicle);

                fetchedVehicles.forEach(
                    vehicle => {
                        db.vehicles.add({
                            queryKey,
                            digest,
                            kenteken: vehicle.kenteken,
                        });
                    },
                );
            } else {
                const vehicle = storedVehicles.shift();
                db.vehicles.delete(vehicle.id);

                callback(vehicle);
                
                if (storedVehicles.length < 5) {
                    const fetchedVehicles = await fetchVehicles(where);

                    fetchedVehicles.forEach(
                        vehicle => {
                            db.vehicles.add({
                                queryKey,
                                digest,
                                kenteken: vehicle.kenteken,
                            });
                        },
                    );
                }
            }
        } catch (e) {
            console.error(e);

            setError(String(e));
        } finally {
            setLoading(false);
        }
    };

    return { next, loading, error };
}