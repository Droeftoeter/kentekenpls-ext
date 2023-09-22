import ky from "ky";

import { RdwOpenDataVehicle } from "../common/types";
import VehicleDatabase from "./VehicleDatabase";

const VehicleDb = new VehicleDatabase();

/**
 * Grabs a random offset for the result-set based on the amount of available items.
 *
 * @param {number} results
 * @param {number} minResults
 *
 * @return {number}
 */
function getRandomOffset(results: number, minResults: number): number {
  const maxOffset = results > minResults ? results - minResults : 0;

  return Math.floor(Math.random() * maxOffset);
}

/**
 * Creates a digest from the given input
 *
 * @param {string} input
 *
 * @return {string}
 */
async function createDigest(input: string): Promise<string> {
  const encoder = new TextEncoder();

  return Array.from(
    new Uint8Array(await crypto.subtle.digest("SHA-1", encoder.encode(input))),
  )
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Fetches vehicles from the public RDW dataset for the given where-query.
 *
 * @param {string[]} where
 */
async function fetchVehicles(
  where: string[] = [],
): Promise<RdwOpenDataVehicle[]> {
  const flatWhere = where.join(" AND ");

  const result = await ky
    .get(
      `https://opendata.rdw.nl/resource/m9d7-ebf2.json?$select=count(kenteken)&$where=${flatWhere}`,
      { timeout: 300000, credentials: "omit" },
    )
    .json<{ count_kenteken?: number }[]>();

  const totalVehicles = Number(result[0].count_kenteken ?? 0);

  const offset = getRandomOffset(totalVehicles, 40);
  return await ky
    .get(
      `https://opendata.rdw.nl/resource/m9d7-ebf2.json?$where=${flatWhere}&$limit=40&$offset=${offset}`,
      { timeout: 300000, credentials: "omit" },
    )
    .json<RdwOpenDataVehicle[]>();
}

/**
 * Finds a vehicle that matches the given where-clause in the RDW database.
 * Uses a previously stored result for the query-key in indexed-db to increase performance
 * in subsequent requests.
 *
 * @param {string}   queryKey
 * @param {string[]} where
 *
 * @return {Promise<RdwOpenDataVehicle>}
 */
export default async function findMatchingVehicle(
  queryKey: string,
  where: string[],
): Promise<RdwOpenDataVehicle> {
  const digest = await createDigest(
    `${VehicleDb.schemaVersion}-${where.join("")}`,
  );

  const storedVehicles = await VehicleDb.getByQueryKeyAndDigest(
    queryKey,
    digest,
  );
  VehicleDb.removeByQueryKeyWhereDigestDoesNotMatch(queryKey, digest);

  // If there are no stored vehicles, fetch a new set from the RDW.
  if (!storedVehicles.length) {
    const fetchedVehicles = await fetchVehicles(where);
    const firstFetchedVehicle = fetchedVehicles.shift();

    if (!firstFetchedVehicle) {
      throw "Geen resultaten gevonden.";
    }

    fetchedVehicles.forEach((vehicle) =>
      VehicleDb.saveVehicle(queryKey, digest, vehicle),
    );

    return firstFetchedVehicle;
  }

  const firstStoredVehicle = storedVehicles.shift();

  if (!firstStoredVehicle || !firstStoredVehicle.id) {
    throw "Geen resultaten gevonden.";
  }

  VehicleDb.removeById(firstStoredVehicle.id);

  // If there are less than 5 stored vehicles left, re-fresh the set in the background.
  if (storedVehicles.length < 5) {
    fetchVehicles(where).then((fetchedVehicles) =>
      fetchedVehicles.forEach((vehicle) =>
        VehicleDb.saveVehicle(queryKey, digest, vehicle),
      ),
    );
  }

  return firstStoredVehicle;
}
