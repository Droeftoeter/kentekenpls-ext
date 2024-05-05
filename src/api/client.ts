import ky from "ky";
import { Type, type Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export class UnexpectedError extends Error {}

const GetLicensePlateCountResponse = Type.Array(
  Type.Object({ count_kenteken: Type.String() }),
);

/**
 * Counts the amount of vehicles matching the where condition.
 *
 * @throws UnexpectedError
 */
export async function getLicensePlateCount($where: string): Promise<number> {
  try {
    const response = await ky
      .get(
        `https://opendata.rdw.nl/resource/m9d7-ebf2.json?$select=count(kenteken)&$where=${$where}`,
        { timeout: 300000, credentials: "omit" },
      )
      .json<unknown>();

    const decodedResponse = Value.Decode(
      GetLicensePlateCountResponse,
      response,
    );

    return Number(decodedResponse[0]?.count_kenteken ?? 0);
  } catch (e: unknown) {
    throw new UnexpectedError(
      e instanceof Error ? e.message : "Unexpected Error",
    );
  }
}

const GetVehiclesResponse = Type.Array(
  Type.Object({ kenteken: Type.String() }),
);

/**
 * Retrieves a list of up-to limit license plates based on the where condition.
 *
 * @throws UnexpectedError
 */
export async function getVehicles(
  $where: string,
  $offset: number,
  $limit: number,
): Promise<Static<typeof GetVehiclesResponse>> {
  try {
    const response = await ky
      .get(
        `https://opendata.rdw.nl/resource/m9d7-ebf2.json?$select=kenteken&$where=${$where}&$limit=${$limit}&$offset=${$offset}`,
        { timeout: 300000, credentials: "omit" },
      )
      .json<unknown>();

    return Value.Decode(GetVehiclesResponse, response);
  } catch (e: unknown) {
    throw new UnexpectedError(
      e instanceof Error ? e.message : "Unexpected Error",
    );
  }
}
