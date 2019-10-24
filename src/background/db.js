import ky from 'ky';
import Dexie from 'dexie';

// Define our database
const db = new Dexie('kentekenpls');
db.version(1).stores({
    vehicles: '++id, [queryKey+digest], queryKey',
});

/**
 * Grabs a random offset for the result-set based on the amount of available items.
 *
 * @param {*} results 
 * @param {*} minResults 
 */
function getRandomOffset(results, minResults) {
    const maxOffset = results > minResults
        ? results - minResults
        : 0;

    return Math.floor(Math.random() * maxOffset);
}

/**
 * Fetch vehicles from RDW.
 * 
 * @param string[] where 
 */
async function fetchVehicles (where = []) {
    const flatWhere = where.join(' AND ');

    const result = await ky.get(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?$select=count(kenteken)&$where=${ flatWhere }`, { timeout: 300000, credentials: 'omit' }).json();
    const totalVehicles = Number(result[ 0 ].count_kenteken);

    const offset = getRandomOffset(totalVehicles, 40);
    return await ky.get(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?$where=${ flatWhere }&$limit=40&$offset=${ offset }`, { timeout: 300000, credentials: 'omit' }).json();
};

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

export default async function fetchVehicle(queryKey, where, callback) {
    const digest = await createDigest(where.join(''));

    const storedVehicles = await db.vehicles
        .where({ queryKey, digest })
        .toArray();

    cleanup(queryKey, digest);

    if (!storedVehicles.length) {
        const fetchedVehicles = await fetchVehicles(where);

        if (!fetchedVehicles.length) {
            throw 'Geen resultaten gevonden.';
        }
        
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
}