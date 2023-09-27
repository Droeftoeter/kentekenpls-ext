import ky from "ky";

export const getVehicles = ($where: string) =>
  ky.get(
    `https://opendata.rdw.nl/resource/m9d7-ebf2.json?$where=${$where}&$limit=40&$offset=1`,
    { timeout: 300000, credentials: "omit" },
  );
