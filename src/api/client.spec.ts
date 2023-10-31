import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { getLicensePlateCount, getVehicles, UnexpectedError } from "./client";

const VEHICLE_RESOURCE = "https://opendata.rdw.nl/resource/m9d7-ebf2.json";
const MOCK_VEHICLE = { kenteken: "AAAA00" };
const MOCK_COUNT = { count_kenteken: "1" };

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("counting vehicles", () => {
  it("returns amount of vehicles matching query query", async () => {
    server.use(
      http.get(VEHICLE_RESOURCE, () => HttpResponse.json([MOCK_COUNT])),
    );

    const count = getLicensePlateCount("voertuigsoort = 'Personenauto'");
    await expect(count).resolves.toEqual(1);
  });

  it("throws on invalid response", async () => {
    server.use(
      http.get(VEHICLE_RESOURCE, () => HttpResponse.json({ invalid: true })),
    );

    const count = getLicensePlateCount("voertuigsoort = 'Personenauto'");
    await expect(count).rejects.toThrow(UnexpectedError);
  });

  it("throws on erroneous response", async () => {
    server.use(
      http.get(VEHICLE_RESOURCE, () =>
        HttpResponse.json([MOCK_COUNT], { status: 500 }),
      ),
    );

    const count = getLicensePlateCount("voertuigsoort = 'Personenauto'");
    await expect(count).rejects.toThrow(UnexpectedError);
  });
});

describe("fetching vehicles", () => {
  it("returns list of vehicles matching the query", async () => {
    server.use(
      http.get(VEHICLE_RESOURCE, () => HttpResponse.json([MOCK_VEHICLE])),
    );

    const vehicles = getVehicles("voertuigsoort = 'Personenauto'", 0, 1);
    await expect(vehicles).resolves.toEqual([MOCK_VEHICLE]);
  });

  it("throws on invalid response", async () => {
    server.use(
      http.get(VEHICLE_RESOURCE, () => HttpResponse.json({ invalid: true })),
    );

    const vehicles = getVehicles("voertuigsoort = 'Personenauto'", 0, 1);
    await expect(vehicles).rejects.toThrow(UnexpectedError);
  });

  it("throws on erroneous response", async () => {
    server.use(
      http.get(VEHICLE_RESOURCE, () =>
        HttpResponse.json([MOCK_VEHICLE], { status: 500 }),
      ),
    );

    const vehicles = getVehicles("voertuigsoort = 'Personenauto'", 0, 1);
    await expect(vehicles).rejects.toThrow(UnexpectedError);
  });
});
