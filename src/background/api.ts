import ky from "ky";

export type RdwOpenDataVehicleColor =
  | "BEIGE"
  | "BLAUW"
  | "BRUIN"
  | "CREME"
  | "GRIJS"
  | "GROEN"
  | "ORANJE"
  | "PAARS"
  | "ROOD"
  | "ROSE"
  | "WIT"
  | "ZWART"
  | "Niet geregistreerd";

export type RdwOpenDataVehicleTaxiIndicator =
  | "Ja"
  | "Nee"
  | "Niet geregistreerd";

export type RdwOpenDataVehicleFuelDescription =
  | "Benzine"
  | "LNG"
  | "Diesel"
  | "Elektriciteit"
  | "LPG"
  | "CNG"
  | "Waterstof"
  | "Alcohol";

export interface RdwOpenDataVehicle {
  kenteken: string;
  merk?: string;
  handelsbenaming?: string;
  eerste_kleur?: RdwOpenDataVehicleColor;
  tweede_kleur?: RdwOpenDataVehicleColor;
  taxi_indicator?: RdwOpenDataVehicleTaxiIndicator;
  catalogusprijs?: string;
  datum_eerste_toelating?: string;
  datum_eerste_tenaamstelling_in_nederland?: string;
  datum_tenaamstelling?: string;
  massa_ledig_voertuig?: string;
  massa_rijklaar?: string;
  maximum_massa_samenstelling?: string;
  vermogen_massarijklaar?: string;
  cilinderinhoud?: string;
  aantal_cilinders?: string;
  aantal_wielen?: string;
  aantal_deuren?: string;
  aantal_zitplaatsen?: string;
  zuinigheidslabel?: string;
  europese_voertuigcategorie?: string;
  wam_verzekerd?: string;
}

export interface RdwOpenDataVehicleFuel {
  kenteken: string;
  brandstof_volgnummer: string;
  brandstof_omschrijving: RdwOpenDataVehicleFuelDescription;
  nettomaximumvermogen?: string;
}

/**
 * Get total amount of vehicles matching the given where statement from the Basisregistratie Voertuigen (BRV)
 */
export async function getVehicleCount(where: string[] = []): Promise<number> {
  const result = await ky
    .get(
      `https://opendata.rdw.nl/resource/m9d7-ebf2.json?$select=count(kenteken)&$where=${where.join(
        " AND ",
      )}`,
      { timeout: 300000, credentials: "omit" },
    )
    .json<{ count_kenteken?: number }[]>();

  return Number(result[0].count_kenteken ?? 0);
}

/**
 * Get vehicles matching the given where statement from the Basisregistratie Voertuigen (BRV)
 */
export async function getVehicles(
  where: string[] = [],
  offset = 0,
): Promise<RdwOpenDataVehicle[]> {
  return await ky
    .get(
      `https://opendata.rdw.nl/resource/m9d7-ebf2.json?$where=${where.join(
        " AND ",
      )}&$limit=40&$offset=${offset}`,
      { timeout: 300000, credentials: "omit" },
    )
    .json<RdwOpenDataVehicle[]>();
}

/**
 * Get fuel information for the given list of vehicles from the Basisregistratie Voertuigen (BRV)
 */
export async function getFuelTypesByVehicles(
  vehicles: RdwOpenDataVehicle[],
): Promise<RdwOpenDataVehicleFuel[]> {
  const inStatement = vehicles
    .map((vehicle) => `"${vehicle.kenteken}"`)
    .join(",");

  return await ky
    .get(
      `https://opendata.rdw.nl/resource/8ys7-d773.json?$select=kenteken,brandstof_volgnummer,brandstof_omschrijving,nettomaximumvermogen&$where=kenteken in (${inStatement})&$order=brandstof_volgnummer`,
      { timeout: 300000, credentials: "omit" },
    )
    .json<RdwOpenDataVehicleFuel[]>();
}
